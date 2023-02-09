<template><div><table>
<thead>
<tr>
<th>排序方法</th>
<th>时间复杂度</th>
<th>是否稳定</th>
</tr>
</thead>
<tbody>
<tr>
<td>冒泡排序</td>
<td>O(N2)</td>
<td>稳定</td>
</tr>
<tr>
<td>选择排序</td>
<td>O(N2)</td>
<td>不稳定</td>
</tr>
<tr>
<td>插入排序</td>
<td>O(N2)</td>
<td>稳定</td>
</tr>
<tr>
<td>归并排序</td>
<td>O(nlogn)</td>
<td>稳定</td>
</tr>
<tr>
<td>快速排序</td>
<td>O(nlogn)</td>
<td>不稳定</td>
</tr>
<tr>
<td>堆排序</td>
<td>O(nlogn)</td>
<td>不稳定</td>
</tr>
</tbody>
</table>
<CodeTabs id="83" :data='[{"title":"java"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">insertSort</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j<span class="token operator">=</span>i<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">;</span> j<span class="token operator">>=</span><span class="token number">0</span><span class="token operator">&amp;&amp;</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token operator">></span>arr<span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


