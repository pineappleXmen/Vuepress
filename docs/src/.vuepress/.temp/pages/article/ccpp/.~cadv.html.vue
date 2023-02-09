<template><div><h2 id="内联汇编" tabindex="-1"><a class="header-anchor" href="#内联汇编" aria-hidden="true">#</a> <strong>内联汇编</strong></h2>
<div class="custom-container tip">
<p class="custom-container-title">内联汇编</p>
<p><strong>内联汇编</strong>（<strong>Inline assembly</strong>）是<strong>部分编译器</strong>支持的一种功能。可以将<strong>汇编语言</strong>内嵌在高级语言源代码中。</p>
<p>编译器GCC(GNU Compiler for Linux)  提供C语言的汇编功能。</p>
<p><a href="http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html#s4" target="_blank" rel="noopener noreferrer">GCC内联汇编文档<ExternalLinkIcon/></a></p>
</div>
<h3 id="基本内联汇编" tabindex="-1"><a class="header-anchor" href="#基本内联汇编" aria-hidden="true">#</a> <strong>基本内联汇编</strong></h3>
<p>基本内联汇编语法</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">asm</span> <span class="token punctuation">[</span><span class="token keyword">volatile</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token string">"opcode"</span><span class="token punctuation">)</span>        <span class="token comment">//opcode 采用 AT&amp;T/UNIX assembly syntax.</span>
__asm__ <span class="token punctuation">[</span><span class="token keyword">volatile</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token string">"opcode"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>asm</code>和<code v-pre>__asm__</code>均可以使用，当asm与其他关键字发生冲突时使用第二个。</p>
<p>如果有超过一个汇编命令在同一个命令中，需要在结尾加上<code v-pre>\n</code> 和 <code v-pre>\t</code>，这是因为每一条命令是用字符串的形式发送给编译器（GAS），需要保证一定的格式。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">__asm__</span> <span class="token punctuation">(</span><span class="token string">"movl %eax, %ebx\n\t"</span>
          <span class="token string">"movl $56, %esi\n\t"</span>
          <span class="token string">"movl %ecx, $label(%edx,%ebx,$4)\n\t"</span>
          <span class="token string">"movb %ah, (%ebx)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展内联汇编" tabindex="-1"><a class="header-anchor" href="#扩展内联汇编" aria-hidden="true">#</a> <strong>扩展内联汇编</strong></h3>
<p><a href="http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html#s5" target="_blank" rel="noopener noreferrer">扩展内联汇编文档<ExternalLinkIcon/></a></p>
<p>扩展内联汇编语法</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">asm</span> <span class="token punctuation">[</span><span class="token keyword">volatile</span><span class="token punctuation">]</span> <span class="token punctuation">(</span> assembler template 
           <span class="token operator">:</span> output operands                  
           <span class="token operator">:</span> input operands                   
           <span class="token operator">:</span> list of clobbered registers      
           <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">asm</span> <span class="token punctuation">[</span><span class="token keyword">volatile</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token string">"汇编指令"</span> 
                <span class="token operator">:</span> <span class="token string">"输出操作数列表"</span> 
                <span class="token operator">:</span> <span class="token string">"输入操作数列表"</span> 
                <span class="token operator">:</span> <span class="token string">"破坏清单"</span>
               <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="操作数格式-operand-format" tabindex="-1"><a class="header-anchor" href="#操作数格式-operand-format" aria-hidden="true">#</a> 操作数格式(operand format)</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token string">"[Constraint Modifiers](Constraint)"</span> <span class="token punctuation">(</span>Addr<span class="token punctuation">)</span>
<span class="token string">"[约束修饰符]约束"</span> <span class="token punctuation">(</span>寄存器或内存地址<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要用多个操作数，需要用逗号隔开。每个操作数可以用数字标识，如果一共有n个操作数，那么输出列表中的第一个为&quot;0&quot;，依次排序，到输入列表的最后一个为&quot;n-1&quot;。</p>
<p>输出操作数必须为左值。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">asm</span> <span class="token punctuation">(</span><span class="token string">"leal (%1,%1,4), %0"</span>
             <span class="token operator">:</span> <span class="token string">"=r"</span> <span class="token punctuation">(</span>five_times_x<span class="token punctuation">)</span>
             <span class="token operator">:</span> <span class="token string">"r"</span> <span class="token punctuation">(</span>x<span class="token punctuation">)</span> 
             <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述的例子中，输入的操作数存入<code v-pre>x</code>中，这里并没有指定具体的寄存器，GCC编译器会帮助我们选择使用的寄存器。上述通过<code v-pre>lea</code>命令将存在x中的数字乘以5。</p>
<h3 id="破坏清单-clobber-list" tabindex="-1"><a class="header-anchor" href="#破坏清单-clobber-list" aria-hidden="true">#</a> 破坏清单 （Clobber List）</h3>
<p>由于内联汇编命令可能会破坏某些寄存器中的值，而这不会被GCC编译器知道，可能会引起一些错误，所以我们需要将**&quot;被破坏的寄存器&quot;**通知给编译器。</p>
<h3 id="lock-关键字" tabindex="-1"><a class="header-anchor" href="#lock-关键字" aria-hidden="true">#</a> <strong>lock 关键字</strong></h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>__asm__ <span class="token function">__volatile__</span><span class="token punctuation">(</span>
                      <span class="token string">"   lock       ;\n"</span>
                      <span class="token string">"   addl %1,%0 ;\n"</span>
                      <span class="token operator">:</span> <span class="token string">"=m"</span>  <span class="token punctuation">(</span>my_var<span class="token punctuation">)</span>
                      <span class="token operator">:</span> <span class="token string">"ir"</span>  <span class="token punctuation">(</span>my_int<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"m"</span> <span class="token punctuation">(</span>my_var<span class="token punctuation">)</span>
                      <span class="token operator">:</span>                <span class="token comment">/* no clobber-list */</span>
                      <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果加上了lock命令，表示这一条汇编命令为一条原子性的命令。</p>
<p>上述的命令是一条原子加法命令</p>
</div></template>


