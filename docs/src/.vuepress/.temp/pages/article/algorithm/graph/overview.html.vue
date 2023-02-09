<template><div><h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念" aria-hidden="true">#</a> <strong>基础概念</strong></h2>
<p><strong>图 (graph)</strong> 是一个二元组G(V(G),E(G))。其中V(G)是非空集，称为 <strong>点集 (vertex set)</strong>，对于V中的每个元素，我们称其为 <strong>顶点 (vertex)</strong> 或 <strong>节点 (node)</strong>，简称 <strong>点</strong>；E(G)为V(G)各结点之间边的集合，称为 <strong>边集 (edge set)</strong>。</p>
<h2 id="图的存储" tabindex="-1"><a class="header-anchor" href="#图的存储" aria-hidden="true">#</a> <strong>图的存储</strong></h2>
<h3 id="直接存边" tabindex="-1"><a class="header-anchor" href="#直接存边" aria-hidden="true">#</a> <strong>直接存边</strong></h3>
<CodeTabs id="12" :data='[{"title":"c++"},{"title":"python"},{"title":"java"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector></span></span>

using namespace std<span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">Edge</span> <span class="token punctuation">{</span>	<span class="token comment">//结构体存储一条边的头结点编号和尾结点编号</span>
  <span class="token keyword">int</span> u<span class="token punctuation">,</span> v<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> n<span class="token punctuation">,</span> m<span class="token punctuation">;</span>
vector<span class="token operator">&lt;</span>Edge<span class="token operator">></span> e<span class="token punctuation">;</span>	<span class="token comment">//边集合</span>
vector<span class="token operator">&lt;</span>bool<span class="token operator">></span> vis<span class="token punctuation">;</span>

<span class="token comment">//遍历边的集合 如果找到头尾节点都吻合为真</span>
bool <span class="token function">find_edge</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> m<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u <span class="token operator">==</span> u <span class="token operator">&amp;&amp;</span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v <span class="token operator">==</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> true<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> false<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> true<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> m<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u <span class="token operator">==</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">dfs</span><span class="token punctuation">(</span>e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cin <span class="token operator">>></span> n <span class="token operator">>></span> m<span class="token punctuation">;</span>

  vis<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> false<span class="token punctuation">)</span><span class="token punctuation">;</span>
  e<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> m<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> cin <span class="token operator">>></span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u <span class="token operator">>></span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Edge</span><span class="token punctuation">:</span>
    u <span class="token operator">=</span> <span class="token number">0</span>
    v <span class="token operator">=</span> <span class="token number">0</span>

n<span class="token punctuation">,</span> m <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span><span class="token builtin">int</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

e <span class="token operator">=</span> <span class="token punctuation">[</span>Edge<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">*</span> m<span class="token punctuation">;</span> vis <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">False</span><span class="token punctuation">]</span> <span class="token operator">*</span> n

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span><span class="token punctuation">:</span>
    e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u<span class="token punctuation">,</span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span><span class="token builtin">int</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">find_edge</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u <span class="token operator">==</span> u <span class="token keyword">and</span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v <span class="token operator">==</span> v<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>
    <span class="token keyword">return</span> <span class="token boolean">False</span>

<span class="token keyword">def</span> <span class="token function">dfs</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span>
    vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>u <span class="token operator">==</span> u<span class="token punctuation">:</span>
            dfs<span class="token punctuation">(</span>e<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>v<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="邻接矩阵" tabindex="-1"><a class="header-anchor" href="#邻接矩阵" aria-hidden="true">#</a> <strong>邻接矩阵</strong></h3>
<p>用一个二维数组来存储边集，数组的i,j索引表示该边的两个点</p>
<CodeTabs id="29" :data='[{"title":"c++"},{"title":"python"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector></span></span>

using namespace std<span class="token punctuation">;</span>

<span class="token keyword">int</span> n<span class="token punctuation">,</span> m<span class="token punctuation">;</span>
vector<span class="token operator">&lt;</span>bool<span class="token operator">></span> vis<span class="token punctuation">;</span>
vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span>bool<span class="token operator">></span> <span class="token operator">></span> adj<span class="token punctuation">;</span>

bool <span class="token function">find_edge</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> true<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> v <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> v <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span> <span class="token operator">++</span>v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">dfs</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cin <span class="token operator">>></span> n <span class="token operator">>></span> m<span class="token punctuation">;</span>

  vis<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> false<span class="token punctuation">)</span><span class="token punctuation">;</span>
  adj<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> vector<span class="token operator">&lt;</span>bool<span class="token operator">></span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> false<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> m<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> u<span class="token punctuation">,</span> v<span class="token punctuation">;</span>
    cin <span class="token operator">>></span> u <span class="token operator">>></span> v<span class="token punctuation">;</span>
    adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">=</span> true<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>vis <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">False</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
adj <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token boolean">False</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    u<span class="token punctuation">,</span> v <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span><span class="token builtin">int</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>

<span class="token keyword">def</span> <span class="token function">find_edge</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span>

<span class="token keyword">def</span> <span class="token function">dfs</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span>
    vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">for</span> v <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">]</span><span class="token punctuation">:</span>
            dfs<span class="token punctuation">(</span>v<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="邻接表" tabindex="-1"><a class="header-anchor" href="#邻接表" aria-hidden="true">#</a> <strong>邻接表</strong></h3>
<p>通过一个可扩展长度的数组来存储一个点所连接的所有边</p>
<CodeTabs id="43" :data='[{"title":"c++"},{"title":"python"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector></span></span>

using namespace std<span class="token punctuation">;</span>

<span class="token keyword">int</span> n<span class="token punctuation">,</span> m<span class="token punctuation">;</span>
vector<span class="token operator">&lt;</span>bool<span class="token operator">></span> vis<span class="token punctuation">;</span>
vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> <span class="token operator">></span> adj<span class="token punctuation">;</span>

bool <span class="token function">find_edge</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> true<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> false<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">dfs</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> true<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token function">dfs</span><span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  cin <span class="token operator">>></span> n <span class="token operator">>></span> m<span class="token punctuation">;</span>

  vis<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> false<span class="token punctuation">)</span><span class="token punctuation">;</span>
  adj<span class="token punctuation">.</span><span class="token function">resize</span><span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> m<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> u<span class="token punctuation">,</span> v<span class="token punctuation">;</span>
    cin <span class="token operator">>></span> u <span class="token operator">>></span> v<span class="token punctuation">;</span>
    adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>vis <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token boolean">False</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
adj <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    u<span class="token punctuation">,</span> v <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span><span class="token builtin">int</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">.</span>append<span class="token punctuation">(</span>v<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">find_edge</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> v<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">True</span>
    <span class="token keyword">return</span> <span class="token boolean">False</span>

<span class="token keyword">def</span> <span class="token function">dfs</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span>
    vis<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        dfs<span class="token punctuation">(</span>adj<span class="token punctuation">[</span>u<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


