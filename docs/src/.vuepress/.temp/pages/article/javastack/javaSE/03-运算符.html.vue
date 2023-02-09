<template><div><h1 id="_1-运算符和表达式" tabindex="-1"><a class="header-anchor" href="#_1-运算符和表达式" aria-hidden="true">#</a> 1.运算符和表达式</h1>
<h3 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符：</h3>
<p>​	就是对常量或者变量进行操作的符号。</p>
<p>​	比如： +  -  *  /</p>
<h3 id="表达式" tabindex="-1"><a class="header-anchor" href="#表达式" aria-hidden="true">#</a> 表达式：</h3>
<p>​	用运算符把常量或者变量连接起来的，符合Java语法的式子就是表达式。</p>
<p>​	比如：a + b 这个整体就是表达式。</p>
<p>​	而其中+是算术运算符的一种，所以这个表达式也称之为算术表达式。</p>
<h1 id="_2-算术运算符" tabindex="-1"><a class="header-anchor" href="#_2-算术运算符" aria-hidden="true">#</a> 2.算术运算符</h1>
<p>分类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">+</span> <span class="token operator">-</span> <span class="token operator">*</span> <span class="token operator">/</span> <span class="token operator">%</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运算特点：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">+</span> <span class="token operator">-</span> <span class="token operator">*</span> <span class="token operator">:</span>跟小学数学中一模一样没有任何区别<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">/</span>：
<span class="token number">1.</span>整数相除结果只能得到整除，如果结果想要是小数，必须要有小数参数。
<span class="token number">2.</span>小数直接参与运算，得到的结果有可能是不精确的。
案例：
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//3</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10.0</span> <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//3.3333333333333335</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">%</span>：取模、取余。
   他做的也是除法运算，只不过获取的是余数而已。
案例：
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//0</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">%</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//1</span>
应用场景：
<span class="token comment">//可以利用取模来判断一个数是奇数还是偶数</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">15</span> <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//1  奇数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="练习-数值拆分" tabindex="-1"><a class="header-anchor" href="#练习-数值拆分" aria-hidden="true">#</a> 练习：数值拆分</h3>
<p>需求：键盘录入一个三位数，将其拆分为个位、十位、百位后，打印在控制台</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.键盘录入一个三位数</span>
<span class="token comment">//导包 --- 创建对象 --- 接收数据</span>
<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入一个三位数"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> number <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//123</span>

<span class="token comment">//2.获取这个三位数的个位、十位、百位并打印出来</span>
<span class="token comment">//公式：</span>
<span class="token comment">//针对于任意的一个数而言</span>
<span class="token comment">//个位： 数字 % 10</span>
<span class="token keyword">int</span> ones <span class="token operator">=</span> number <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token comment">//十位： 数字 / 10 % 10</span>
<span class="token keyword">int</span> tens <span class="token operator">=</span> number <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token comment">//百位： 数字 / 100 % 10</span>
<span class="token keyword">int</span> hundreds <span class="token operator">=</span> number <span class="token operator">/</span> <span class="token number">100</span>  <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token comment">//输出结果</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>ones<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>tens<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>hundreds<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>公式：</p>
<p>​	获取任意一个数上每一位数。</p>
<p>个位：数字 % 10</p>
<p>十位：数字 / 10 % 10</p>
<p>百位：数字 / 100 % 10</p>
<p>千位：数字 / 1000 % 10</p>
<p>。。。以此类推。。。</p>
<h1 id="_3-隐式转换" tabindex="-1"><a class="header-anchor" href="#_3-隐式转换" aria-hidden="true">#</a> 3.隐式转换</h1>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念：</h3>
<p>​	也叫自动类型提升。</p>
<p>​	就是把一个取值范围小的数据或者变量，赋值给另一个取值范围大的变量。此时不需要我们额外写代码单独实现，是程序自动帮我们完成的。</p>
<h3 id="简单记忆" tabindex="-1"><a class="header-anchor" href="#简单记忆" aria-hidden="true">#</a> 简单记忆：</h3>
<p>​	就是小的给大的，可以直接给。</p>
<h3 id="两种提升规则" tabindex="-1"><a class="header-anchor" href="#两种提升规则" aria-hidden="true">#</a> 两种提升规则：</h3>
<ul>
<li>取值范围小的，和取值范围大的进行运算，小的会先提升为大的，再进行运算。</li>
<li>byte、short、char三种类型的数据在运算的时候，都会直接先提升为int，然后再进行运算。</li>
</ul>
<h3 id="取值范围从小到大的关系" tabindex="-1"><a class="header-anchor" href="#取值范围从小到大的关系" aria-hidden="true">#</a> 取值范围从小到大的关系：</h3>
<p>​	byte short int long float double</p>
<h1 id="_4-隐式转换的练习" tabindex="-1"><a class="header-anchor" href="#_4-隐式转换的练习" aria-hidden="true">#</a> 4.隐式转换的练习</h1>
<p>请看下面案例是否有误，如果有问题，请说出原因，如果没有问题，请说出运算过程和运算结果</p>
<h3 id="案例一" tabindex="-1"><a class="header-anchor" href="#案例一" aria-hidden="true">#</a> 案例一：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//10.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	10是整数，整数默认是int类型的。</p>
<p>​	而在取值范围的顺序中：byte short int long float double</p>
<p>​	在赋值的时候把一个int类型的赋值给了一个double类型的。把一个小的赋值给一个大的是可以直接给的。</p>
<h3 id="案例二" tabindex="-1"><a class="header-anchor" href="#案例二" aria-hidden="true">#</a> 案例二：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> b<span class="token punctuation">;</span><span class="token comment">//可以成功赋值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	因为byte的取值范围是小的，int的取值范围是大的，在底层进行了隐式转换，不需要我们额外写代码单独实现，是可以直接赋值。</p>
<h3 id="案例三" tabindex="-1"><a class="header-anchor" href="#案例三" aria-hidden="true">#</a> 案例三：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> n <span class="token operator">=</span> <span class="token number">20L</span><span class="token punctuation">;</span>
<span class="token operator">?</span><span class="token operator">?</span><span class="token operator">?</span> result <span class="token operator">=</span> i <span class="token operator">+</span> n<span class="token punctuation">;</span>
问变量result是什么类型的？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	变量i是int类型的，变量n是long类型的。</p>
<p>​	而在取值范围的顺序中：byte short int long float double</p>
<p>​	变量i里面的值会自动提升为long类型的，最终的结果其实就是两个long相加，那么最终的result是long类型的。</p>
<h3 id="案例四" tabindex="-1"><a class="header-anchor" href="#案例四" aria-hidden="true">#</a> 案例四：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> n <span class="token operator">=</span> <span class="token number">100L</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">20.0</span><span class="token punctuation">;</span>
<span class="token operator">?</span><span class="token operator">?</span><span class="token operator">?</span> result <span class="token operator">=</span> i <span class="token operator">+</span> n <span class="token operator">+</span> d<span class="token punctuation">;</span>
问变量result是什么类型的？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	变量i是int类型，变量n是long类型，变量d是double类型。</p>
<p>​	而在取值范围的顺序中：byte short int long float double</p>
<p>​	所以变量i和变量n里面的值在参与运算的时候，都会进行类型提升，变成double。</p>
<p>​	最终其实就是三个double进行相加，那么最终的结果就是double类型的。</p>
<h3 id="案例五" tabindex="-1"><a class="header-anchor" href="#案例五" aria-hidden="true">#</a> 案例五：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">byte</span> b1 <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> b2 <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token operator">?</span><span class="token operator">?</span><span class="token operator">?</span> result <span class="token operator">=</span> b1 <span class="token operator">+</span> b2<span class="token punctuation">;</span><span class="token comment">//int</span>
问变量result是什么类型的？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	因为b1和b2都是byte类型的。所以在参与计算的时候，变量b1和变量b2里面的值都会自动提升为int类型的。最终其实就是两个int类型的相加，最终结果也是int类型的。</p>
<h3 id="案例六" tabindex="-1"><a class="header-anchor" href="#案例六" aria-hidden="true">#</a> 案例六：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> s <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token keyword">long</span> n <span class="token operator">=</span> <span class="token number">100L</span><span class="token punctuation">;</span>
<span class="token operator">?</span><span class="token operator">?</span><span class="token operator">?</span> result <span class="token operator">=</span> b <span class="token operator">+</span> s <span class="token operator">+</span> n<span class="token punctuation">;</span>
问变量result是什么类型的？<span class="token keyword">long</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<p>​	变量b是byte类型的，变量s是short类型的，变量n是long类型的。</p>
<p>​	byte，short，char类型的变量在参与运算的时候，变量里面的值会直接先提升为int。</p>
<p>第一步：变量b和变量s里面的值会先提升为int参与运算。</p>
<p>​		int + int + long</p>
<p>第二步：而long类型的取值范围是大于int的取值范围的。</p>
<p>​		所以变量b和变量s里面的值会再次提升为long。</p>
<p>​		long + long + long。</p>
<p>所以最终结果是long类型的。</p>
<h1 id="_5-强制转换" tabindex="-1"><a class="header-anchor" href="#_5-强制转换" aria-hidden="true">#</a> 5.强制转换</h1>
<h3 id="概念-1" tabindex="-1"><a class="header-anchor" href="#概念-1" aria-hidden="true">#</a> 概念：</h3>
<p>​	如果要把一个取值范围大的数据或者变量赋值给另一个取值范围小的变量。是不允许直接操作。</p>
<p>​	如果一定要这么干，就需要加入强制转换。</p>
<h3 id="书写格式" tabindex="-1"><a class="header-anchor" href="#书写格式" aria-hidden="true">#</a> 书写格式：</h3>
<p>​	目标数据类型 变量名 = （目标数据类型）被强转的数据；</p>
<p>简单理解：</p>
<p>​	要转成什么类型的，那么就在小括号中写什么类型就可以了。</p>
<p>案例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperatorDemo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">double</span> a <span class="token operator">=</span> <span class="token number">12.3</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> a<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//12</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意点：</p>
<p>​	强制转换有可能会导致数据发生错误。（数据的精度丢失）</p>
<h1 id="_6-字符串的-操作" tabindex="-1"><a class="header-anchor" href="#_6-字符串的-操作" aria-hidden="true">#</a> 6.字符串的+操作</h1>
<h3 id="核心技巧" tabindex="-1"><a class="header-anchor" href="#核心技巧" aria-hidden="true">#</a> 核心技巧：</h3>
<ul>
<li>当+操作中出现字符串时，此时就是字符串的连接符，会将前后的数据进行拼接，并产生一个新的字符串。</li>
<li>当连续进行+操作时，从左到右逐个执行的。</li>
</ul>
<h1 id="_7-字符串相加的练习" tabindex="-1"><a class="header-anchor" href="#_7-字符串相加的练习" aria-hidden="true">#</a> 7.字符串相加的练习：</h1>
<p>案例1：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">1</span> <span class="token operator">+</span> <span class="token string">"abc"</span> <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：&quot;1abc1&quot;</p>
<p>解释：</p>
<p>​	第一步： 1 + &quot;abc&quot;。在这个过程中，有字符串参与的，所以做的是拼接操作，产生一个新的字符串&quot;1abc&quot;</p>
<p>​	第二步：  &quot;1abc&quot; + 1。这个过程中，有字符串参与的，所以做的也是拼接操作，产生一个新的字符串&quot;1abc1&quot;</p>
<p>案例2：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token string">"abc"</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果：“3abc21”</p>
<p>解释：</p>
<p>​	第一步：1 + 2 。在这个过程中，没有字符串参与的，所以做的是加法运算，结果为3。</p>
<p>​	第二步：3 + &quot;abc&quot;。在这个过程中，有字符串参与的，所以做的是拼接操作，产生一个新的字符串&quot;3abc&quot;。</p>
<p>​	第三步：&quot;3abc&quot; + 2。在这个过程中，有字符串参与的，所以做的是拼接操作，产生一个新的字符串&quot;3abc2&quot;。</p>
<p>​	第四步：&quot;3abc2&quot; + 1。在这个过程中，有字符串参与的，所以做的是拼接操作，产生一个新的字符串“3abc21”</p>
<p>案例3：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"黑默丁格"</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我的名字是"</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结果： 我的名字是黑默丁格</p>
<p>解释：当字符串跟变量相加的时候，实际上是跟变量里面的值进行拼接。</p>
<h1 id="_8-字符的-操作" tabindex="-1"><a class="header-anchor" href="#_8-字符的-操作" aria-hidden="true">#</a> 8.字符的+操作</h1>
<h3 id="规则" tabindex="-1"><a class="header-anchor" href="#规则" aria-hidden="true">#</a> 规则：</h3>
<p>​	当+操作中出现了字符，会拿着字符到计算机内置的ASCII码表中去查对应的数字，然后再进行计算。</p>
<h3 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> result <span class="token operator">=</span> c <span class="token operator">+</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//97</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ASCII码表中：</p>
<p>​	'a'   -----    97</p>
<p>​	'A'   -----    65</p>
<h1 id="_9-算术运算符的总结" tabindex="-1"><a class="header-anchor" href="#_9-算术运算符的总结" aria-hidden="true">#</a> 9.算术运算符的总结</h1>
<p>分类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">+</span> <span class="token operator">-</span> <span class="token operator">*</span> <span class="token operator">/</span> <span class="token operator">%</span>  这些操作跟小学数学几乎是一模一样的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意点：</p>
<ul>
<li>/ 和 % 的区别：他们两个都是做除法运算，/取结果的商。% 取结果的余数。</li>
<li>整数操作只能得到整数，如果想要得到小数，必须有浮点数参与运算。</li>
</ul>
<p>算术运算符的高级用法：</p>
<p>是以+为例进行的讲解，其余减法，乘法，除法的运算规则也是一样的。</p>
<p>特例：字符串只有+操作，没有其他操作。</p>
<h1 id="_10-自增自减运算符" tabindex="-1"><a class="header-anchor" href="#_10-自增自减运算符" aria-hidden="true">#</a> 10.自增自减运算符</h1>
<h3 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">++</span>  自增运算符
<span class="token operator">--</span>  自减运算符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>++：就是把变量里面的值+1</p>
<p>--：就是把变量里面的值-1</p>
<h3 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式：</h3>
<ul>
<li>放在变量的前面，我们叫做先++。 比如：++a</li>
<li>放在变量的后面，我们叫做后++。 比如：a++</li>
</ul>
<h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点：</h3>
<p>​	不管是先++，还是后++。单独写在一行的时候，运算结果是一模一样的。</p>
<h3 id="案例-1" tabindex="-1"><a class="header-anchor" href="#案例-1" aria-hidden="true">#</a> 案例：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//++</span>
<span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
a<span class="token operator">++</span><span class="token punctuation">;</span><span class="token comment">//就是让变量a里面的值 + 1</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//11</span>
<span class="token operator">++</span>a<span class="token punctuation">;</span><span class="token comment">//就是让变量a里面的值 + 1</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//12</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自增自减运算符的应用场景" tabindex="-1"><a class="header-anchor" href="#自增自减运算符的应用场景" aria-hidden="true">#</a> 自增自减运算符的应用场景：</h3>
<p>某些情况下，变量需要进行加1或者减1的时候使用。</p>
<p>比如：过生日多一岁，就用到了自增运算符。</p>
<p>比如：购物商场中，选择商品数量，也用到了自增或者自减运算符。</p>
<p>比如：统计很多数据中，有多少个数据满足要求，也用到了自增运算符。</p>
<h1 id="_11-赋值运算符" tabindex="-1"><a class="header-anchor" href="#_11-赋值运算符" aria-hidden="true">#</a> 11.赋值运算符</h1>
<p>最为常用的：	=</p>
<p>运算过程：就是把等号右边的结果赋值给左边的变量</p>
<p>案例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperatorDemo6</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//1.最为简单的赋值运算符用法</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//就是把10赋值给变量a</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//2.如果等号右边需要进行计算。</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span><span class="token comment">//先计算等号右边的，把计算的结果赋值给左边的变量</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//3.特殊的用法</span>
        a <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//先计算等号右边的，把计算的结果赋值给左边的变量</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//20</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_12-扩展赋值运算符" tabindex="-1"><a class="header-anchor" href="#_12-扩展赋值运算符" aria-hidden="true">#</a> 12.扩展赋值运算符</h1>
<h3 id="分类-1" tabindex="-1"><a class="header-anchor" href="#分类-1" aria-hidden="true">#</a> 分类：</h3>
<p>​	+=、-=、*=、/=、%=</p>
<h3 id="运算规则" tabindex="-1"><a class="header-anchor" href="#运算规则" aria-hidden="true">#</a> 运算规则：</h3>
<p>​	就是把左边跟右边进行运算，把最终的结果赋值给左边，对右边没有任何影响。</p>
<h3 id="案例-2" tabindex="-1"><a class="header-anchor" href="#案例-2" aria-hidden="true">#</a> 案例：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperatorDemo7</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//扩展赋值运算符</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        a <span class="token operator">+=</span> b<span class="token punctuation">;</span><span class="token comment">//把左边和右边相加，再把最终的结果赋值给左边，对右边没有任何影响</span>
        <span class="token comment">// 相当于 a = a + b;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//30</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//20</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注意点-1" tabindex="-1"><a class="header-anchor" href="#注意点-1" aria-hidden="true">#</a> 注意点：</h3>
<p>​	扩展的赋值运算符中隐层还包含了一个强制转换。</p>
<p>以+=为例。</p>
<p>a += b ;实际上相当于 a = (byte)(a + b);</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperatorDemo8</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">byte</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token comment">//a += b;</span>
        a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//30</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_13-关系运算符" tabindex="-1"><a class="header-anchor" href="#_13-关系运算符" aria-hidden="true">#</a> 13.关系运算符</h1>
<p>又叫比较运算符，其实就是拿着左边跟右边进行了判断而已。</p>
<h3 id="分类-2" tabindex="-1"><a class="header-anchor" href="#分类-2" aria-hidden="true">#</a> 分类：</h3>
<table>
<thead>
<tr>
<th>符号</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>==</td>
<td>就是判断左边跟右边是否相等，如果成立就是true，如果不成立就是false</td>
</tr>
<tr>
<td>!=</td>
<td>就是判断左边跟右边是否不相等，如果成立就是true，如果不成立就是false</td>
</tr>
<tr>
<td>&gt;</td>
<td>就是判断左边是否大于右边，如果成立就是true，如果不成立就是false</td>
</tr>
<tr>
<td>&gt;=</td>
<td>就是判断左边是否大于等于右边，如果成立就是true，如果不成立就是false</td>
</tr>
<tr>
<td>&lt;</td>
<td>就是判断左边是否小于右边，如果成立就是true，如果不成立就是false</td>
</tr>
<tr>
<td>&lt;=</td>
<td>就是判断左边是否小于等于右边，如果成立就是true，如果不成立就是false</td>
</tr>
</tbody>
</table>
<h3 id="注意点-2" tabindex="-1"><a class="header-anchor" href="#注意点-2" aria-hidden="true">#</a> 注意点：</h3>
<ul>
<li>关系运算符最终的结果一定是布尔类型的。要么是true，要么是false</li>
<li>在写==的时候，千万不要写成=</li>
</ul>
<h1 id="_14-逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_14-逻辑运算符" aria-hidden="true">#</a> 14.逻辑运算符</h1>
<h3 id="和-的使用" tabindex="-1"><a class="header-anchor" href="#和-的使用" aria-hidden="true">#</a> &amp; 和 | 的使用：</h3>
<p>&amp;：逻辑与（而且）</p>
<p>​	两边都为真，结果才是真，只要有一个为假，那么结果就是假。</p>
<p>|：逻辑或（或者）</p>
<p>​	两边都为假，结果才是假，只要有一个为真，那么结果就是真。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// &amp;  //两边都是真，结果才是真。</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">&amp;</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">&amp;</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">&amp;</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">&amp;</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"==================================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// | 或  //两边都是假，结果才是假，如果有一个为真，那么结果就是真。</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">|</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">|</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">|</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">|</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景：</h3>
<p>​	根据固定的场景，来选择使用&amp;还是使用|</p>
<ul>
<li>
<p>用户登录。</p>
<p>用户名输入正确  &amp; 密码输入正确</p>
<p>因为只有用户名和密码同时都正确了，那么才能成功登录，只要有一个失败了都不行。</p>
<p>使用技巧：</p>
<p>​	当我们需要同时满足左边和右边两种情况时，可以使用且</p>
</li>
<li>
<p>丈母娘选女婿</p>
<p>丈母娘：女婿啊，你要么买个房子，要么买辆车。就可以把我的小棉袄穿走了。</p>
<p>买个房子 | 买辆车</p>
<p>两个条件中，只要满足其中一个，就可以穿走小棉袄了。</p>
<p>使用技巧：</p>
<p>​	当两种条件只要满足其中一个的时候，可以使用或</p>
</li>
</ul>
<h3 id="异或-的使用" tabindex="-1"><a class="header-anchor" href="#异或-的使用" aria-hidden="true">#</a> ^（异或）的使用：</h3>
<p>​	在以后用的不多，了解一下即可。</p>
<p>计算规则：如果两边相同，结果为false，如果两边不同，结果为true</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//^   //左右不相同，结果才是true，左右相同结果就是false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">^</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">^</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">true</span> <span class="token operator">^</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token boolean">false</span> <span class="token operator">^</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="取反-的使用" tabindex="-1"><a class="header-anchor" href="#取反-的使用" aria-hidden="true">#</a> !（取反）的使用：</h3>
<p>​	是取反，也叫做非。</p>
<p>计算规则：false取反就是true，true取反就是false</p>
<p>温馨提示：<strong>取反最多只用一个。</strong></p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//true</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//false</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//注意点：取反最多只用一个。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_15-短路逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_15-短路逻辑运算符" aria-hidden="true">#</a> 15.短路逻辑运算符</h1>
<p>分类：  &amp;&amp;   ||</p>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> &amp;&amp;：</h3>
<p>​	运算结果跟&amp;是一模一样的，只不过具有短路效果。</p>
<h3 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> ||：</h3>
<p>​	运算结果跟|是一模一样的。只不过具有短路效果。</p>
<h3 id="逻辑核心" tabindex="-1"><a class="header-anchor" href="#逻辑核心" aria-hidden="true">#</a> 逻辑核心：</h3>
<p>​	当左边不能确定整个表达式的结果，右边才会执行。</p>
<p>​	当左边能确定整个表达式的结果，那么右边就不会执行了。从而提高了代码的运行效率。</p>
<h3 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例：</h3>
<ul>
<li>
<p>用户登录案例</p>
<p>用户名正确  &amp; 密码正确</p>
<p>如果使用一个&amp;，不管用户名是否正确都会去验证密码。</p>
</li>
</ul>
<p>思考：</p>
<p>​	如果用户名输入正确了，那么我们再判断密码是否正确，是符合业务逻辑的。</p>
<p>​	但是如果用户名输入错误了，那么现在还有必要去比较密码吗？没有不要了。</p>
<p>​	如果使用一个&amp;，那么左边和右边不管什么情况下，都会执行。</p>
<p>​	用户名正确  &amp;&amp;  密码正确</p>
<p>​	如果用户名输入正确了，那么才会验证密码是否输入正确。</p>
<p>​	如果用户名输入错误了，那么就不会再去验证密码是否正确，最终的结果直接为false。从而提高了程序运行的效率。</p>
<ul>
<li>
<p>丈母娘选女婿</p>
<p>有房 |  有车</p>
<p>首先先看看有没有房，发现有，然后再去看看有没有车。</p>
</li>
</ul>
<p>思考：</p>
<p>​	既然都有房子，干嘛还要去看车呢？多此一举。</p>
<p>​	有房 ||  有车</p>
<p>​	首先先看看有没有房，如果有，那么右边就不执行了。最终的结果直接为true。</p>
<p>​	如果没有房子，才会去看右边有没有车。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结：</h3>
<p>​	&amp;&amp; 和 &amp; 、||和|的运行结果都是一模一样的。</p>
<p>​	但是短路逻辑运算符可以提高程序的运行效率。</p>
<h3 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议：</h3>
<p>​	最为常用： &amp;&amp;   ||   ！</p>
<h1 id="_16-三元运算符" tabindex="-1"><a class="header-anchor" href="#_16-三元运算符" aria-hidden="true">#</a> 16.三元运算符</h1>
<p>又叫做：三元表达式或者问号冒号表达式。</p>
<h3 id="格式" tabindex="-1"><a class="header-anchor" href="#格式" aria-hidden="true">#</a> 格式：</h3>
<p>​	关系表达式 ？ 表达式1 ：表达式2 ；</p>
<h3 id="计算规则" tabindex="-1"><a class="header-anchor" href="#计算规则" aria-hidden="true">#</a> 计算规则：</h3>
<ul>
<li>计算关系表达式的值。</li>
<li>如果关系表达式的值为真，那么执行表达式1。</li>
<li>如果关系表达式的值为假，那么执行表达式2。</li>
</ul>
<h3 id="注意点-3" tabindex="-1"><a class="header-anchor" href="#注意点-3" aria-hidden="true">#</a> 注意点：</h3>
<p>​	三元运算符的最终结果一定要被使用，要么赋值给一个变量，要么直接打印出来。</p>
<h3 id="案例-3" tabindex="-1"><a class="header-anchor" href="#案例-3" aria-hidden="true">#</a> 案例：</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperatorDemo12</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//需求：求两个数的较大值</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>

        <span class="token comment">//格式：关系表达式 ？ 表达式1 ： 表达式2 ；</span>
        <span class="token comment">//注意点：</span>
        <span class="token comment">//三元运算符的最终结果一定要被使用。</span>
        <span class="token comment">//要么赋值给一个变量，要么直接输出。</span>
       <span class="token keyword">int</span> max <span class="token operator">=</span>  a <span class="token operator">></span> b <span class="token operator">?</span> a <span class="token operator">:</span> b <span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">></span> b <span class="token operator">?</span> a <span class="token operator">:</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_17-练习1-两只老虎" tabindex="-1"><a class="header-anchor" href="#_17-练习1-两只老虎" aria-hidden="true">#</a> 17.练习1-两只老虎</h1>
<p>需求：</p>
<p>​	动物园里有两只老虎，两只老虎的体重分别为通过键盘录入获得，</p>
<p>​	请用程序实现判断两只老虎的体重是否相同。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.获取两只老虎的体重</span>
<span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入第一只老虎的体重"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> weight1 <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"请输入第二只老虎的体重"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> weight2 <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//2.利用三元运算符求出最终结果</span>
<span class="token class-name">String</span> result <span class="token operator">=</span> weight1 <span class="token operator">==</span> weight2 <span class="token operator">?</span> <span class="token string">"相同"</span> <span class="token operator">:</span> <span class="token string">"不相同"</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_18-练习2-求三个数的最大值" tabindex="-1"><a class="header-anchor" href="#_18-练习2-求三个数的最大值" aria-hidden="true">#</a> 18.练习2-求三个数的最大值</h1>
<p>需求：</p>
<p>​	一座寺庙里住着三个和尚，已知他们的身高分别为150cm、210cm、165cm。</p>
<p>​	请用程序实现获取这三个和尚的最高身高。</p>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//1.定义三个变量记录和尚的身高</span>
<span class="token keyword">int</span> height1 <span class="token operator">=</span> <span class="token number">150</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> height2 <span class="token operator">=</span> <span class="token number">210</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> height3 <span class="token operator">=</span> <span class="token number">165</span><span class="token punctuation">;</span>

<span class="token comment">//2.利用三元运算符求出两个数中的较大值。</span>
<span class="token keyword">int</span> temp <span class="token operator">=</span> height1 <span class="token operator">></span> height2 <span class="token operator">?</span> height1 <span class="token operator">:</span> height2<span class="token punctuation">;</span>

<span class="token comment">//3.求出最终的结果</span>
<span class="token keyword">int</span> max <span class="token operator">=</span> temp <span class="token operator">></span> height3 <span class="token operator">?</span> temp <span class="token operator">:</span> height3<span class="token punctuation">;</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_19-运算符的优先级" tabindex="-1"><a class="header-anchor" href="#_19-运算符的优先级" aria-hidden="true">#</a> 19.运算符的优先级</h1>
<p>在Java中涉及了很多的运算符，每一种运算符都有各自的优先级。但是这些优先级不需要记忆。</p>
<p>咱们只要知道其中一点：</p>
<p>​	小括号优先于所有。</p>
</div></template>


