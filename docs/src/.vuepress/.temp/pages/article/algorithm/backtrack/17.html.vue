<template><div><h4 id="_17-电话号码的字母组合" tabindex="-1"><a class="header-anchor" href="#_17-电话号码的字母组合" aria-hidden="true">#</a> <a href="https://leetcode.cn/problems/letter-combinations-of-a-phone-number/" target="_blank" rel="noopener noreferrer">17. 电话号码的字母组合<ExternalLinkIcon/></a></h4>
<p>难度中等2055</p>
<p>给定一个仅包含数字 <code v-pre>2-9</code> 的字符串，返回所有它能表示的字母组合。答案可以按 <strong>任意顺序</strong> 返回。</p>
<p>给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。</p>
<figure><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/11/09/200px-telephone-keypad2svg.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p><strong>示例 1：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：digits = ""
输出：[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入：digits = "2"
输出：["a","b","c"]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p>
<ul>
<li><code v-pre>0 &lt;= digits.length &lt;= 4</code></li>
<li><code v-pre>digits[i]</code> 是范围 <code v-pre>['2', '9']</code> 的一个数字。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
	<span class="token comment">//一个映射表，第二个位置是"abc“,第三个位置是"def"。。。</span>
	<span class="token comment">//这里也可以用map，用数组可以更节省点内存</span>
	<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> letter_map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">" "</span><span class="token punctuation">,</span><span class="token string">"*"</span><span class="token punctuation">,</span><span class="token string">"abc"</span><span class="token punctuation">,</span><span class="token string">"def"</span><span class="token punctuation">,</span><span class="token string">"ghi"</span><span class="token punctuation">,</span><span class="token string">"jkl"</span><span class="token punctuation">,</span><span class="token string">"mno"</span><span class="token punctuation">,</span><span class="token string">"pqrs"</span><span class="token punctuation">,</span><span class="token string">"tuv"</span><span class="token punctuation">,</span><span class="token string">"wxyz"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">letterCombinations</span><span class="token punctuation">(</span><span class="token class-name">String</span> digits<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//注意边界条件</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>digits<span class="token operator">==</span><span class="token keyword">null</span> <span class="token operator">||</span> digits<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">iterStr</span><span class="token punctuation">(</span>digits<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> res<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//最终输出结果的list</span>
	<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token comment">//递归函数</span>
	<span class="token keyword">void</span> <span class="token function">iterStr</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">,</span> <span class="token class-name">StringBuilder</span> letter<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//递归的终止条件，注意这里的终止条件看上去跟动态演示图有些不同，主要是做了点优化</span>
		<span class="token comment">//动态图中是每次截取字符串的一部分，"234"，变成"23"，再变成"3"，最后变成""，这样性能不佳</span>
		<span class="token comment">//而用index记录每次遍历到字符串的位置，这样性能更好</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>letter<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//获取index位置的字符，假设输入的字符是"234"</span>
		<span class="token comment">//第一次递归时index为0所以c=2，第二次index为1所以c=3，第三次c=4</span>
		<span class="token comment">//subString每次都会生成新的字符串，而index则是取当前的一个字符，所以效率更高一点</span>
		<span class="token keyword">char</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//map_string的下表是从0开始一直到9， c-'0'就可以取到相对的数组下标位置</span>
		<span class="token comment">//比如c=2时候，2-'0'，获取下标为2,letter_map[2]就是"abc"</span>
		<span class="token keyword">int</span> pos <span class="token operator">=</span> c <span class="token operator">-</span> <span class="token char">'0'</span><span class="token punctuation">;</span>
		<span class="token class-name">String</span> map_string <span class="token operator">=</span> letter_map<span class="token punctuation">[</span>pos<span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token comment">//遍历字符串，比如第一次得到的是2，页就是遍历"abc"</span>
		<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>map_string<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//调用下一层递归，用文字很难描述，请配合动态图理解</span>
            letter<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>map_string<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//如果是String类型做拼接效率会比较低</span>
			<span class="token comment">//iterStr(str, letter+map_string.charAt(i), index+1);</span>
            <span class="token function">iterStr</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> letter<span class="token punctuation">,</span> index<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            letter<span class="token punctuation">.</span><span class="token function">deleteCharAt</span><span class="token punctuation">(</span>letter<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


