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
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//堆排序</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">heapSort</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token operator">==</span><span class="token keyword">null</span><span class="token operator">||</span>arr<span class="token punctuation">.</span>length<span class="token operator">&lt;</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">>=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">--</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>i<span class="token punctuation">,</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token comment">//将原数列变成大根堆</span>
        <span class="token keyword">int</span> heapSize <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//将最大值放在最后一位 数组大小--</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>heapSize<span class="token operator">></span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">heapify</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//再次变为大根堆</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">--</span>heapSize<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//放在最后一位</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">heapInsert</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span><span class="token keyword">int</span> index<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token operator">></span>arr<span class="token punctuation">[</span><span class="token punctuation">(</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span>index<span class="token punctuation">,</span><span class="token punctuation">(</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            index<span class="token operator">=</span><span class="token punctuation">(</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">heapify</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">//左边孩子下标</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> heapSize<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> largest <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> heapSize <span class="token operator">&amp;&amp;</span> arr<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">?</span> left <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> left<span class="token punctuation">;</span>
            largest <span class="token operator">=</span> arr<span class="token punctuation">[</span>largest<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">?</span> largest <span class="token operator">:</span> index<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>largest <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> largest<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
            index <span class="token operator">=</span> largest<span class="token punctuation">;</span>
            left <span class="token operator">=</span> index <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token comment">//O(log</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


