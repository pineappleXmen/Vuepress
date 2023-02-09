<template><div><div class="custom-container tip">
<p class="custom-container-title">Java 字节码</p>
<p>In computing, <strong>Java bytecode</strong> is the bytecode-structured instruction set of the Java virtual machine (JVM), a virtual machine that enables a computer to run programs written in the Java programming language and several other programming languages, see List of JVM languages.</p>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se10/html/jvms-6.html#jvms-6.5" target="_blank" rel="noopener noreferrer">Java字节码规范<ExternalLinkIcon/></a></p>
</div>
<h2 id="应用于操作数栈" tabindex="-1"><a class="header-anchor" href="#应用于操作数栈" aria-hidden="true">#</a> <strong>应用于操作数栈</strong></h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>dup: 复制栈顶元素
pop: 弹出栈顶元素
swap: 交换栈顶两个元素的值
iconst: -1~5 入栈
bipush: -128~127 入栈
sipush: -32768~32767 入栈
ldc: -2147483648~2147483647 入栈
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用于局部变量表" tabindex="-1"><a class="header-anchor" href="#应用于局部变量表" aria-hidden="true">#</a> <strong>应用于局部变量表</strong></h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>istore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="计算相关" tabindex="-1"><a class="header-anchor" href="#计算相关" aria-hidden="true">#</a> 计算相关</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>iadd 把栈顶两个元素相加后 结果压入栈
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>goto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


