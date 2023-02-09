<template><div><h1 id="位运算" tabindex="-1"><a class="header-anchor" href="#位运算" aria-hidden="true">#</a> 位运算</h1>
<h2 id="常用的位运算方法" tabindex="-1"><a class="header-anchor" href="#常用的位运算方法" aria-hidden="true">#</a> 常用的位运算方法</h2>
<h3 id="异或" tabindex="-1"><a class="header-anchor" href="#异或" aria-hidden="true">#</a> 异或^</h3>
<blockquote>
<p>不同为1，相同为0  </p>
</blockquote>
<p>判断两个值是否相等：a^b==0</p>
<p>翻转第i位的值  a^(1&lt;&lt;(i-1))</p>
<p>判断奇数或偶数个 奇：同一个数字偶数个相异或 全为0</p>
<h3 id="按位与" tabindex="-1"><a class="header-anchor" href="#按位与" aria-hidden="true">#</a> 按位与&amp;</h3>
<blockquote>
<p>同时为1才为1 有一个为0则为0</p>
</blockquote>
<p>将二进制最右位的1变为0 ：num&amp;(num-1)</p>
<p>提取最右一位的1：num&amp;(~(num-1))  也就是 num&amp;(-num)  </p>
<h3 id="按位或" tabindex="-1"><a class="header-anchor" href="#按位或" aria-hidden="true">#</a> 按位或|</h3>
<blockquote>
<p>有一位为1即可</p>
</blockquote>
<p>用于给某一位赋值：res |=（value&lt;&lt;i）</p>
<h3 id="取反" tabindex="-1"><a class="header-anchor" href="#取反" aria-hidden="true">#</a> 取反~</h3>
<blockquote>
<p>正数：原码=反码=补码      负数：反码=~原码   补码=反码+1   计算机用补码表示负数</p>
</blockquote>
<p>-num = （~num+1）</p>
<p>-num = ~（num-1）</p>
<h4 id="位运算-1" tabindex="-1"><a class="header-anchor" href="#位运算-1" aria-hidden="true">#</a> 位运算</h4>
<table>
<thead>
<tr>
<th>题号</th>
<th>难度</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://www.wolai.com/u5UydoM8FhfE3vCTwHkeBz" title="201. 数字范围按位与" target="_blank" rel="noopener noreferrer">201. 数字范围按位与<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>答案为所有该范围数字的公共前缀  利用num&amp;（num-1）拿到右侧公共的1，直到两数相等</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/3Ma8moRzpKt4YzQQUR7PsA" title="136. 只出现一次的数字" target="_blank" rel="noopener noreferrer">136. 只出现一次的数字<ExternalLinkIcon/></a></td>
<td>简单</td>
<td>利用异或性质 将全部数字异或 结果就是该数字</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/tgrnnRCSMMnkQ5DG5Uju8i" title="137. 只出现一次的数字 II" target="_blank" rel="noopener noreferrer">137. 只出现一次的数字 II<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>统计32位中每一位各出现几次 随后对3取余 最后拿出该数字即可</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/rfTqSyzR4TRiS6KZSEPmnK" title="260. 只出现一次的数字 III" target="_blank" rel="noopener noreferrer">260. 只出现一次的数字 III<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>将所有数字异或结果就是num1^num2 通过num&amp;-num 取出最右一位1  由于异或是不同为1 说明这两个数二进制该位是不同的 所以将与该数按位与相同的异或为一个数 不同的异或为另一个 得到答案</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/51qWAsa3vHPHn4QTgy3M3o" title="78. 子集 I" target="_blank" rel="noopener noreferrer">78. 子集 I<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>通过生成2^nums.length个bit mask来生成结果（因为nums个数会有2^nums.length个排列组合结果）如果该位为1则取 为0不取 来生成结果集</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/mYFvHz9ZbSha7iWsKtHYw1" title="90. 子集 II" target="_blank" rel="noopener noreferrer">90. 子集 II<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>同78.需要用hashset辅助排除结果集</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/d8AV9LECBirwGBj9QdjpbA" title="187. 重复的DNA序列" target="_blank" rel="noopener noreferrer">187. 重复的DNA序列<ExternalLinkIcon/></a></td>
<td>中等</td>
<td>滑动窗口+bit mask</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/p9K5h9iaabFcKdiieECdPD" title="191. 位1的个数" target="_blank" rel="noopener noreferrer">191. 位1的个数<ExternalLinkIcon/></a></td>
<td>简单</td>
<td>num&amp;num-1</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/C2SUV7a4FWCYJNpcTnLNP" title="645. 错误的集合" target="_blank" rel="noopener noreferrer">645. 错误的集合<ExternalLinkIcon/></a></td>
<td>简单</td>
<td>再添加0-n的数 这样缺失的出现一次 多的出现3次 用xor 拿出x^y 取出最低不同位 拿出x y 再次遍历 存在的即是多余的</td>
</tr>
<tr>
<td><a href="https://www.wolai.com/tKBh1Fc8NJjzVpAXhMqR5b" title="_" target="_blank" rel="noopener noreferrer">_<ExternalLinkIcon/></a></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
</div></template>


