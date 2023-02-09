<template><div><CodeTabs id="0" :data='[{"title":"python"}]' tab-id="shell">

<template #tab0="{ title, value, isActive }">
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">binpow</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    res <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">while</span> b <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>b <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            res <span class="token operator">=</span> res <span class="token operator">*</span> a
        a <span class="token operator">=</span> a <span class="token operator">*</span> a
        b <span class="token operator">>></span><span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">return</span> res
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


