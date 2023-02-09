<template><div><h2 id="_1-无限循环" tabindex="-1"><a class="header-anchor" href="#_1-无限循环" aria-hidden="true">#</a> 1.无限循环</h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念：</h3>
<p>​	又叫死循环。循环一直停不下来。</p>
<h3 id="for格式" tabindex="-1"><a class="header-anchor" href="#for格式" aria-hidden="true">#</a> for格式：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"循环执行一直在打印内容"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>初始化语句可以空着不写，表示循环之前不定义任何的控制变量。</p>
<p>条件判断语句可以空着不写，如果不写，默认表示true，循环一直进行。</p>
<p>条件控制语句可以空着不写，表示每次循环体执行完毕后，控制变量不做任何变化。</p>
<h3 id="while格式" tabindex="-1"><a class="header-anchor" href="#while格式" aria-hidden="true">#</a> while格式：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"循环执行一直在打印内容"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	小括号里面就不能省略了，true一定要写出来，否则代码会报错。</p>
<h3 id="do-while格式" tabindex="-1"><a class="header-anchor" href="#do-while格式" aria-hidden="true">#</a> do...while格式：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">do</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"循环执行一直在打印内容"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	小括号里面就不能省略了，true一定要写出来，否则代码会报错。</p>
<h3 id="无限循环的注意事项" tabindex="-1"><a class="header-anchor" href="#无限循环的注意事项" aria-hidden="true">#</a> 无限循环的注意事项：</h3>
<ul>
<li>最为常用的格式：while</li>
<li>无限循环下面不能再写其他代码了，因为永远执行不到。</li>
</ul>
<h2 id="_2-条件控制语句" tabindex="-1"><a class="header-anchor" href="#_2-条件控制语句" aria-hidden="true">#</a> 2.条件控制语句</h2>
<ul>
<li>break</li>
<li>continue</li>
</ul>
<h3 id="break" tabindex="-1"><a class="header-anchor" href="#break" aria-hidden="true">#</a> break:</h3>
<p>​	不能单独存在的。可以用在switch和循环中，表示结束，跳出的意思。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.吃1~5号包子</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"在吃第"</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">"个包子"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2.吃完第三个的时候就不吃了</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span><span class="token comment">//结束整个循环。</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="continue" tabindex="-1"><a class="header-anchor" href="#continue" aria-hidden="true">#</a> continue:</h3>
<p>​	不能单独存在的。只能存在于循环当中。</p>
<p>​	表示：跳过本次循环，继续执行下次循环。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.吃1~5号包子</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//2.第3个包子有虫子就跳过，继续吃下面的包子</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//跳过本次循环（本次循环中，下面的代码就不执行了），继续执行下次循环。</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"在吃第"</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">"个包子"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-random" tabindex="-1"><a class="header-anchor" href="#_3-random" aria-hidden="true">#</a> 3. Random</h2>
<p>Random跟Scanner一样，也是Java提前写好的类，我们不需要关心是如何实现的，只要直接使用就可以了。</p>
<h3 id="使用步骤" tabindex="-1"><a class="header-anchor" href="#使用步骤" aria-hidden="true">#</a> 使用步骤：</h3>
<ol>
<li>导包</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span></span><span class="token punctuation">;</span>
导包的动作必须出现在类定义的上边。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>创建对象</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
上面这个格式里面，只有r是变量名，可以变，其他的都不允许变。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>生成随机数</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> number <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span>随机数的范围<span class="token punctuation">)</span><span class="token punctuation">;</span>
上面这个格式里面，只有number是变量名，可以变，其他的都不允许变。
随机数范围的特点：从<span class="token number">0</span>开始，不包含指定值。比如：参数为<span class="token number">10</span>，生成的范围<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.导包</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Random</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RandomDemo1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//2.创建对象</span>
        <span class="token class-name">Random</span> r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//3.生成随机数</span>
        <span class="token keyword">int</span> number <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//包左不包右，包头不包尾</span>
        <span class="token comment">//0 ~ 99</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-平方根" tabindex="-1"><a class="header-anchor" href="#_5-平方根" aria-hidden="true">#</a> 5. 平方根</h2>
<p>需求：</p>
<p>​	键盘录入一个大于等于2的整数 x ，计算并返回 x 的 平方根 。结果只保留整数部分 ，小数部分将被舍去 。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">/*需求：键盘录入一个大于等于2的整数 x ，计算并返回 x 的 平方根 。
        结果只保留整数部分 ，小数部分将被舍去 。*/</span>


<span class="token comment">//分析：</span>
<span class="token comment">//平方根   16的平方根4</span>
<span class="token comment">//         4的平方根2</span>


<span class="token comment">// 10</span>
<span class="token comment">// 1 * 1 = 1 &lt; 10</span>
<span class="token comment">// 2 * 2 = 4 &lt; 10</span>
<span class="token comment">// 3 * 3 = 9 &lt; 10</span>
<span class="token comment">// 4 * 4 = 16 > 10</span>
<span class="token comment">//推断：10的平方根是在3~4之间。</span>


<span class="token comment">// 20</span>
<span class="token comment">// 1 * 1 = 1 &lt; 20</span>
<span class="token comment">// 2 * 2 = 4 &lt; 20</span>
<span class="token comment">// 3 * 3 = 9 &lt; 20</span>
<span class="token comment">// 4 * 4 = 16 &lt; 20</span>
<span class="token comment">// 5 * 5 = 25 > 20</span>
<span class="token comment">//推断：20的平方根是在4~5之间。</span>


<span class="token comment">//在代码当中</span>
<span class="token comment">//从1开始循环，拿着数字的平方跟原来的数字进行比较</span>
<span class="token comment">//如果小于的，那么继续往后判断</span>
<span class="token comment">//如果相等，那么当前数字就是平方根</span>
<span class="token comment">//如果大于的，那么前一个数字就是平方跟的整数部分</span>


<span class="token comment">//1.键盘录入一个整数</span>
<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入一个整数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> number <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//2.从1开始循环判断</span>
<span class="token comment">//开始：1 结束: number</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> number<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//用i * i 再跟number进行比较</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">*</span> i <span class="token operator">==</span> number<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">"就是"</span> <span class="token operator">+</span> number <span class="token operator">+</span> <span class="token string">"的平方根"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//一旦找到了，循环就可以停止了，后面的数字就不需要再找了，提高代码的运行效率。</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">*</span> i <span class="token operator">></span> number<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"就是"</span> <span class="token operator">+</span> number <span class="token operator">+</span> <span class="token string">"平方根的整数部分"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


