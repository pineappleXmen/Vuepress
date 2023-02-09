<template><div><div class="custom-container tip">
<p class="custom-container-title">并发模块</p>
<p>多处理器编程</p>
<p>理解并发程序执行</p>
<p>并发控制</p>
<p>并发编程及对Bug应对</p>
</div>
<div class="custom-container note">
<p class="custom-container-title">什么是并发(Concurrent)</p>
<p>Concurrent: existing, happening, or done <strong><em>at the same time</em>.</strong></p>
<p>In computer science, concurrency refers to the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome. (Wikipedia)</p>
</div>
<p>如果使用状态机的视角查看并发程序，并发的程序实际是一个共享内存的多个执行流</p>
<p>共享内存的多个执行流</p>
<ul>
<li>执行流拥有独立的堆栈/寄存器</li>
<li>共享全部的内存 (指针可以互相引用)</li>
</ul>
<p>多个执行流会带来方便，同时也打开了潘多拉的魔盒</p>
<div class="custom-container note">
<p class="custom-container-title">并发程序带来的问题</p>
<p>原子性缺失</p>
<p>顺序性缺失</p>
<p>可见性缺失</p>
</div>
<h2 id="多处理器编程" tabindex="-1"><a class="header-anchor" href="#多处理器编程" aria-hidden="true">#</a> 多处理器编程</h2>
<h3 id="原子性" tabindex="-1"><a class="header-anchor" href="#原子性" aria-hidden="true">#</a> <strong>原子性</strong></h3>
<p>原子性：一段代码执行 (例如 <code v-pre>pay()</code>) 独占整个计算机系统</p>
<ul>
<li>单处理器多线程
<ul>
<li>线程在运行时可能被中断，切换到另一个线程执行</li>
</ul>
</li>
<li>多处理器多线程
<ul>
<li>线程根本就是并行执行的</li>
</ul>
</li>
</ul>
<p>在多处理器时代，程序的原子性无法被保证。此时需要使用其他的方式来保证在并发状态下的程序的原子性。</p>
<p>那么如何实现并发程序的原子性呢？</p>
<ul>
<li><code v-pre>lock(&amp;lk)</code></li>
<li><code v-pre>unlock(&amp;lk)</code>
<ul>
<li>实现临界区 (critical section) 之间的绝对串行化</li>
<li>程序的其他部分依然可以并行执行</li>
</ul>
</li>
</ul>
<p>99% 的并发问题都可以用一个队列解决</p>
<ul>
<li>把大任务切分成可以并行的小任务</li>
<li>worker thread 去锁保护的队列里取任务</li>
<li>除去不可并行的部分，剩下的部分可以获得线性的加速</li>
</ul>
<h3 id="顺序性" tabindex="-1"><a class="header-anchor" href="#顺序性" aria-hidden="true">#</a> <strong>顺序性</strong></h3>
<div class="custom-container note">
<p class="custom-container-title">编译器的优化</p>
<p>编译器对内存访问 “eventually consistent” 的处理导致共享内存作为线程同步工具的失效。</p>
</div>
<p>在C程序被编译成汇编码的过程里，并不会保证程序执行的顺序性。</p>
<p>另一方面，CPU也是编译器，会对汇编码进行进一步的优化。这也会导致代码顺序性的错误。</p>
<p>如何保证顺序性？</p>
<p>可以使用下面的内联汇编语句实现内存屏障</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">asm</span> <span class="token keyword">volatile</span> <span class="token punctuation">(</span><span class="token string">""</span> <span class="token operator">::</span><span class="token operator">:</span> <span class="token string">"memory"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>__volatile__告诉编译器，严禁将此处的汇编语句与其它的语句重组合优化。即：原原本本按原来的样子处理这这里的汇编。
<strong>memory</strong>强制 gcc 编译器假设 RAM 所有内存单元均被汇编指令修改，这样 cpu 中的 registers 和 cache 中已缓存的内存单元中的数据将作废。**cpu 将不得不在需要的时候重新读取内存中的数据。**这就阻止了 cpu 又将 registers, cache 中的数据用于去优化指令，而避免去访问内存。
&quot;&quot;::: 表示这是个空指令。barrier() 不用在此插入一条串行化汇编指令。在后文将讨论什么叫串行化指令。</p>
<p>那么这句话是什么意思呢？它只是插入了一个空指令&quot;&quot;，什么也没做。其实不然，这句话的关键在最后的&quot;memory&quot; clobber，它告诉编译器：这条指令（其实是空的）可能会读取任何内存地址，也可能会改写任何内存地址。那么编译器会变得保守起来，它会防止这条fence命令上方的内存访问操作移到下方，同时防止下方的操作移到上面，也就是防止了乱序，是我们想要的结果。</p>
<p>但这还没完，这条命令还有另外一个副作用：它会让编译器把所有缓存在寄存器中的内存变量flush到内存中，然后重新从内存中读取这些值。这并不一定是我们想要的结果，比如有些变量只在当前线程中使用，留在寄存器中很好，多了一对写/读内存操作是不必要的开销。</p>
<p>同时也可以使用 mfence 汇编命令实现内存的屏障</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">asm</span> <span class="token keyword">volatile</span> <span class="token punctuation">(</span><span class="token string">"mfence"</span> <span class="token operator">::</span><span class="token operator">:</span> <span class="token string">"memory"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container note">
<p class="custom-container-title">mfence 手册</p>
<p><a href="https://www.felixcloutier.com/x86/mfence.html" target="_blank" rel="noopener noreferrer">mfence<ExternalLinkIcon/></a></p>
<p><a href="https://stackoverflow.com/questions/12183311/difference-in-mfence-and-asm-volatile-memory" target="_blank" rel="noopener noreferrer">mfence 和 asm volatile (&quot;&quot; ::: &quot;memory&quot;); 区别<ExternalLinkIcon/></a></p>
</div>
<h3 id="可见性" tabindex="-1"><a class="header-anchor" href="#可见性" aria-hidden="true">#</a> 可见性</h3>
<p>现代的处理器本身也是一个动态的处理器</p>
<div class="custom-container note">
<p class="custom-container-title">现代处理器也是只保证最终一致性</p>
<p>满足单处理器 eventual memory consistency 的执行，在多处理器上可能无法序列化！</p>
<p><a href="https://research.swtch.com/hwmm" target="_blank" rel="noopener noreferrer">内存系统模型<ExternalLinkIcon/></a></p>
</div>
<p>如何保证顺序性</p>
<p>可以通过关键字</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">__sync_synchronize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
RTFM 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://gcc.gnu.org/onlinedocs/gcc/_005f_005fsync-Builtins.html" target="_blank" rel="noopener noreferrer">syc 手册<ExternalLinkIcon/></a></p>
<h2 id="并发编程控制" tabindex="-1"><a class="header-anchor" href="#并发编程控制" aria-hidden="true">#</a> 并发编程控制</h2>
<h3 id="互斥" tabindex="-1"><a class="header-anchor" href="#互斥" aria-hidden="true">#</a> 互斥</h3>
<div class="custom-container note">
<p class="custom-container-title">互斥算法的困难点</p>
<p>实现互斥的根本困难：不能同时读/写共享内存</p>
<ul>
<li>load (环顾四周) 的时候不能写，只能 “看一眼就把眼睛闭上”
<ul>
<li>看到的东西马上就过时了</li>
</ul>
</li>
<li>store (改变物理世界状态) 的时候不能读，只能 “闭着眼睛动手”
<ul>
<li>也不知道把什么改成了什么</li>
</ul>
</li>
</ul>
</div>
<blockquote>
<p>Peterson算法</p>
</blockquote>
<p>如果软件无法解决问题，硬件可以用一条指令来解决</p>
<p>硬件能为我们提供一条 “瞬间完成” 的读 + 写指令</p>
<p>在Intel 80486指令集中 增加了Lock指令</p>
<p>Lock的作用为，在CPU执行到带有Lock指令的时候，会将内存先上锁（此时其他CPU无法读写内存）随后在执行操作。</p>
<figure><img src="\os\CPU80486.png" alt="80486 CPU内存模型" tabindex="0" loading="lazy"><figcaption>80486 CPU内存模型</figcaption></figure>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">xchg</span><span class="token punctuation">(</span><span class="token keyword">volatile</span> <span class="token keyword">int</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token keyword">int</span> newval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> result<span class="token punctuation">;</span>
  <span class="token keyword">asm</span> <span class="token keyword">volatile</span> <span class="token punctuation">(</span><span class="token string">"lock xchg %0, %1"</span>
    <span class="token operator">:</span> <span class="token string">"+m"</span><span class="token punctuation">(</span><span class="token operator">*</span>addr<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"=a"</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">(</span>newval<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个原子操作，是在硬件层面上了一把总线锁，由总线决定谁更先运行。</p>
<p>然而今天的CPU拥有多个缓存(L1、L2、L3)</p>
<figure><img src="\os\CPU80486cache.png" alt="CPU Cache模型" tabindex="0" loading="lazy"><figcaption>CPU Cache模型</figcaption></figure>
<p>这意味着，如果需要给Memory中的某个值上锁，则需要将其他CPU的Cache中的这个值给删掉，这增加了很多性能损耗。</p>
<p><strong>思考一下：我们对原子操作的主要需求</strong></p>
<p>考虑常见的原子操作：</p>
<ul>
<li>atomic test-and-set
<ul>
<li><code v-pre>reg = load(x); if (reg == XX) { store(x, YY); }</code></li>
</ul>
</li>
<li>lock xchg
<ul>
<li><code v-pre>reg = load(x); store(x, XX);</code></li>
</ul>
</li>
<li>lock add
<ul>
<li><code v-pre>t = load(x); t++; store(x, t);</code></li>
</ul>
</li>
</ul>
<p>它们的本质都是：</p>
<ol>
<li>load</li>
<li>exec (处理器本地寄存器的运算)</li>
<li>store</li>
</ol>
<p>通过硬件来解决这个问题</p>
<h4 id="load-reserved-store-conditional-lr-sc" tabindex="-1"><a class="header-anchor" href="#load-reserved-store-conditional-lr-sc" aria-hidden="true">#</a> Load-Reserved/Store-Conditional (LR/SC)</h4>
<p>LR: 在内存上标记 reserved (盯上你了)，中断、其他处理器写入都会导致标记消除</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>lr.w rd, (rs1)
  rd = M[rs1]
  reserve M[rs1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>SC: 如果 “盯上” 未被解除，则写入</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sc.w rd, rs2, (rs1)
  if still reserved:
    M[rs1] = rs2
    rd = 0
  else:
    rd = nonzero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从硬件上实现CAS指令</p>
<h4 id="compare-and-swap-的-lr-sc-实现" tabindex="-1"><a class="header-anchor" href="#compare-and-swap-的-lr-sc-实现" aria-hidden="true">#</a> Compare-and-Swap 的 LR/SC 实现</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>int cas(int *addr, int cmp_val, int new_val) {
  int old_val = *addr;
  if (old_val == cmp_val) {
    *addr = new_val; return 0;
  } else { return 1; }
}
cas:
  lr.w  t0, (a0)       # Load original value.
  bne   t0, a1, fail   # Doesn’t match, so fail.
  sc.w  t0, a2, (a0)   # Try to update.
  bnez  t0, cas        # Retry if store-conditional failed.
  li a0, 0             # Set return to success.
  jr ra                # Return.
fail:
  li a0, 1             # Set return to failure.
  jr ra                # Return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是一个自旋锁。</p>
<div class="custom-container note">
<p class="custom-container-title">LR/SC的硬件实现</p>
<p><a href="https://github.com/riscv-boom/riscv-boom" target="_blank" rel="noopener noreferrer">RISCV-BOOM<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/riscv-boom/riscv-boom/blob/master/src/main/scala/lsu/dcache.scala#L655" target="_blank" rel="noopener noreferrer">LR SC<ExternalLinkIcon/></a></p>
</div>
<div class="custom-container tip">
<p class="custom-container-title">自旋锁缺陷</p>
<p>自旋锁也会面临一定的缺陷</p>
<ul>
<li>
<p>自旋 (共享变量) 会触发处理器间的缓存同步，延迟增加</p>
</li>
<li>
<p>除了进入临界区的线程，其他处理器上的线程都在空转</p>
</li>
<li>
<p>争抢锁的处理器越多，利用率越低</p>
</li>
<li>
<p>获得自旋锁的线程 可能被操作系统切换出去</p>
<ul>
<li>操作系统不 “感知” 线程在做什么 (但为什么不能呢？)</li>
</ul>
</li>
<li>
<p>实现 100% 的资源浪费</p>
</li>
</ul>
</div>
<p>自旋锁浪费的例子</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread-sync.h"</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">N</span> <span class="token expression"><span class="token number">10000000</span></span></span>
<span class="token class-name">spinlock_t</span> lock <span class="token operator">=</span> <span class="token function">SPIN_INIT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">long</span> n<span class="token punctuation">,</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">Tsum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">spin_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    sum<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">spin_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> nthread <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  n <span class="token operator">=</span> N <span class="token operator">/</span> nthread<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nthread<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">create</span><span class="token punctuation">(</span>Tsum<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>sum <span class="token operator">==</span> n <span class="token operator">*</span> nthread<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上面的代码，发现一个线程时只需100ms 而如果增加多个线程运行时，时间不减反增，这就是因为自旋锁面临的问题。</p>
<div class="custom-container note">
<p class="custom-container-title">自旋锁使用场景</p>
<p><strong>临界区几乎不拥堵</strong></p>
<p><strong>持有自旋锁时禁止执行流切换</strong>（持有锁 但被切换出去 导致其他一直在等，但操作系统不会允许程序实现这一点）</p>
<p>故使用场景主要在</p>
<ul>
<li>操作系统可以关闭中断和抢占
<ul>
<li>保证锁的持有者在很短的时间内可以释放锁</li>
</ul>
</li>
<li>(如果是虚拟机呢...😂)
<ul>
<li>PAUSE 指令会触发 VM Exit</li>
</ul>
</li>
<li>但依旧很难做好</li>
</ul>
</div>
<p>那么该如何实现长临界区的互斥呢</p>
<p>“让” 不是 C 语言代码可以做到的 (C 代码只能计算)</p>
<ul>
<li>
<p>把锁的实现放到操作系统里就好啦！</p>
<ul>
<li>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>syscall(SYSCALL_lock, &amp;lk);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>试图获得 <code v-pre>lk</code>，但如果失败，就切换到其他线程</li>
</ul>
</li>
<li>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>syscall(SYSCALL_unlock, &amp;lk);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>释放 <code v-pre>lk</code>，如果有等待锁的线程就唤醒</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>操作系统 = 更衣室管理员</p>
<ul>
<li>先到的人 (线程)
<ul>
<li>成功获得手环，进入游泳馆</li>
<li><code v-pre>*lk = 🔒</code>，系统调用直接返回</li>
</ul>
</li>
<li>后到的人 (线程)
<ul>
<li>不能进入游泳馆，排队等待</li>
<li>线程放入等待队列，执行线程切换 (yield)</li>
</ul>
</li>
<li>洗完澡出来的人 (线程)
<ul>
<li>交还手环给管理员；管理员把手环再交给排队的人</li>
<li>如果等待队列不空，从等待队列中取出一个线程允许执行</li>
<li>如果等待队列为空，<code v-pre>*lk = ✅</code></li>
</ul>
</li>
<li>管理员 (OS) 使用自旋锁确保自己处理手环的过程是原子的</li>
</ul>
<p><strong>自旋锁和睡眠锁各有自己的优点和缺点</strong></p>
<p>自旋锁 (线程直接共享 locked)</p>
<ul>
<li>更快的 fast path
<ul>
<li>xchg 成功 → 立即进入临界区，开销很小</li>
</ul>
</li>
<li>更慢的 slow path
<ul>
<li>xchg 失败 → 浪费 CPU 自旋等待</li>
</ul>
</li>
</ul>
<p>睡眠锁 (通过系统调用访问 locked)</p>
<ul>
<li>更快的 slow path
<ul>
<li>上锁失败线程不再占用 CPU</li>
</ul>
</li>
<li>更慢的 fast path
<ul>
<li>即便上锁成功也需要进出内核 (syscall)</li>
</ul>
</li>
</ul>
<p>那么是否有两种都要的锁呢</p>
<ul>
<li>Fast path: 一条原子指令，上锁成功立即返回</li>
<li>Slow path: 上锁失败，执行系统调用睡眠
<ul>
<li>性能优化的最常见技巧
<ul>
<li>看 average (frequent) case 而不是 worst case</li>
</ul>
</li>
</ul>
</li>
</ul>
<hr>
<p>POSIX 线程库中的互斥锁 (<code v-pre>pthread_mutex</code>)</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread-sync.h"</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">N</span> <span class="token expression"><span class="token number">10000000</span></span></span>
<span class="token class-name">mutexlock_t</span> lock <span class="token operator">=</span> <span class="token function">MUTEX_INIT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">long</span> n<span class="token punctuation">,</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">Tsum</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    sum<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> nthread <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  n <span class="token operator">=</span> N <span class="token operator">/</span> nthread<span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nthread<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">create</span><span class="token punctuation">(</span>Tsum<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>sum <span class="token operator">==</span> n <span class="token operator">*</span> nthread<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="futex的实现" tabindex="-1"><a class="header-anchor" href="#futex的实现" aria-hidden="true">#</a> Futex的实现</h4>
<p>可以发现明显改善了多线程的时候自旋锁的缺点。</p>
<p>那么Futex如何实现的呢</p>
<p>先在用户空间自旋</p>
<ul>
<li>如果获得锁，直接进入</li>
<li>未能获得锁，系统调用</li>
<li>解锁以后也需要系统调用
<ul>
<li><a href="http://jyywiki.cn/pages/OS/2022/demos/futex.py" target="_blank" rel="noopener noreferrer">futex.py<ExternalLinkIcon/></a></li>
<li>更好的设计可以在 fast-path 不进行系统调用</li>
</ul>
</li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">Futex</p>
<p><a href="https://lwn.net/Articles/360699/" target="_blank" rel="noopener noreferrer">Futex overview and update<ExternalLinkIcon/></a></p>
<p><a href="http://jyywiki.cn/pages/OS/manuals/futexes-are-tricky.pdf" target="_blank" rel="noopener noreferrer">Futex are tricky<ExternalLinkIcon/></a></p>
</div>
<h3 id="同步" tabindex="-1"><a class="header-anchor" href="#同步" aria-hidden="true">#</a> 同步</h3>
<div class="custom-container tip">
<p class="custom-container-title">同步概念</p>
<h4 id="同步-synchronization" tabindex="-1"><a class="header-anchor" href="#同步-synchronization" aria-hidden="true">#</a> 同步 (Synchronization)</h4>
<p>两个或两个以上随时间变化的量在变化过程中保持一定的相对关系</p>
<ul>
<li>iPhone/iCloud 同步 (手机 vs 电脑 vs 云端)</li>
<li>变速箱同步器 (合并快慢速齿轮)</li>
<li>同步电机 (转子与磁场速度一致)</li>
<li>同步电路 (所有触发器在边沿同时触发)</li>
</ul>
<hr>
<p>异步 (Asynchronous) = 不同步</p>
<ul>
<li>上述很多例子都有异步版本 (异步电机、异步电路、异步线程)</li>
</ul>
</div>
<h4 id="生产者-消费者问题-学废你就赢了" tabindex="-1"><a class="header-anchor" href="#生产者-消费者问题-学废你就赢了" aria-hidden="true">#</a> 生产者-消费者问题：学废你就赢了</h4>
<blockquote>
<p>99% 的实际并发问题都可以用生产者-消费者解决。</p>
</blockquote>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>void Tproduce() { while (1) printf("("); }
void Tconsume() { while (1) printf(")"); }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>printf</code> 前后增加代码，使得打印的括号序列满足</p>
<ul>
<li>
<p>一定是某个合法括号序列的前缀</p>
</li>
<li>
<p>括号嵌套的深度不超过</p>
<p>n<em>n</em></p>
<ul>
<li>n=3<em>n</em>=3, <code v-pre>((())())(((</code> 合法</li>
<li>n=3<em>n</em>=3, <code v-pre>(((())))</code>, <code v-pre>(()))</code> 不合法</li>
</ul>
</li>
<li>
<p>同步</p>
<ul>
<li>等到有空位再打印左括号</li>
<li>等到能配对时再打印右括号</li>
</ul>
</li>
</ul>
<p>为什么叫 “生产者-消费者” 而不是 “括号问题”？</p>
<ul>
<li>左括号：生产资源 (任务)、放入队列</li>
<li>右括号：从队列取出资源 (任务) 执行</li>
</ul>
<hr>
<p>能否用互斥锁实现括号问题？</p>
<ul>
<li>左括号：嵌套深度 (队列) 不足 n<em>n</em> 时才能打印</li>
<li>右括号：嵌套深度 (队列)&gt;1时才能打印
<ul>
<li>当然是等到满足条件时再打印了
<ul>
<li>用互斥锁保持条件成立</li>
</ul>
</li>
<li>压力测试的检查当然不能少：<a href="http://jyywiki.cn/pages/OS/2022/demos/pc-check.py" target="_blank" rel="noopener noreferrer">pc-check.py<ExternalLinkIcon/></a></li>
<li>Model checker 当然也不能少 (留作习题)ss</li>
</ul>
</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread-sync.h"</span></span>

<span class="token keyword">int</span> n<span class="token punctuation">,</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">mutex_t</span> lk <span class="token operator">=</span> <span class="token function">MUTEX_INIT</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">Tproduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
retry<span class="token operator">:</span>
    <span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">goto</span> retry<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"("</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">Tconsume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
retry<span class="token operator">:</span>
    <span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">goto</span> retry<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    count<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">")"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>argc <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  n <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setbuf</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">create</span><span class="token punctuation">(</span>Tproduce<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">create</span><span class="token punctuation">(</span>Tconsume<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这样还是会有自旋的操作</p>
<p>如何避免呢</p>
<h4 id="conditional-variables-条件变量-cv" tabindex="-1"><a class="header-anchor" href="#conditional-variables-条件变量-cv" aria-hidden="true">#</a> Conditional Variables (条件变量, CV)</h4>
<p>把上述代码中的自旋变成睡眠</p>
<ul>
<li>在完成操作时唤醒</li>
</ul>
<hr>
<p>条件变量 API</p>
<ul>
<li>wait(cv, mutex) 💤
<ul>
<li>调用时必须保证已经获得 mutex</li>
<li>释放 mutex、进入睡眠状态</li>
</ul>
</li>
<li>signal/notify(cv) 💬 私信：走起
<ul>
<li>如果有线程正在等待 cv，则唤醒其中一个线程</li>
</ul>
</li>
<li>broadcast/notifyAll(cv) 📣 所有人：走起
<ul>
<li>唤醒全部正在等待 cv 的线程</li>
</ul>
</li>
</ul>
<p>通过条件变量的代码</p>
<p>我们可以实现刚刚的问题</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">Tproduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> n<span class="token punctuation">)</span> <span class="token function">cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">,</span> <span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"("</span><span class="token punctuation">)</span><span class="token punctuation">;</span> count<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token function">cond_signal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">Tconsume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token function">cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">,</span> <span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">")"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> count<span class="token operator">--</span><span class="token punctuation">;</span> <span class="token function">cond_signal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是这样的代码在面临生产者和消费者不对等的时候是不成立的。</p>
<p>所以需要两个条件变量来控制同类不唤醒。</p>
<p><strong>条件变量：正确的打开方式</strong></p>
<p>需要等待条件满足时</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mutex_lock(&amp;mutex);
while (!cond) {
  wait(&amp;cv, &amp;mutex);
}
assert(cond);
// ...
// 互斥锁保证了在此期间条件 cond 总是成立
// ...
mutex_unlock(&amp;mutex);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他线程条件可能被满足时</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>broadcast(&amp;cv);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>随后来挑战一个更为复杂的题目！</p>
<p>::: warn 打印一条鱼</p>
<p>有三种线程，分别打印 <code v-pre>&lt;</code>, <code v-pre>&gt;</code>, 和 <code v-pre>_</code></p>
<ul>
<li>对这些线程进行同步，使得打印出的序列总是 <code v-pre>&lt;&gt;&lt;_</code> 和 <code v-pre>&gt;&lt;&gt;_</code> 组合</li>
</ul>
<hr>
<p>使用条件变量，只要回答三个问题：</p>
<ul>
<li>打印 “<code v-pre>&lt;</code>” 的条件？</li>
<li>打印 “<code v-pre>&gt;</code>” 的条件？</li>
<li>打印 “<code v-pre>_</code>” 的条件？</li>
</ul>
<p>:::</p>
<p>画状态机 同时解决即可</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"thread.h"</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">LENGTH</span><span class="token expression"><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>

<span class="token keyword">enum</span> <span class="token punctuation">{</span> A <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> B<span class="token punctuation">,</span> C<span class="token punctuation">,</span> D<span class="token punctuation">,</span> E<span class="token punctuation">,</span> F<span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">rule</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> from<span class="token punctuation">,</span> ch<span class="token punctuation">,</span> to<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">rule</span> rules<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">{</span> A<span class="token punctuation">,</span> <span class="token char">'&lt;'</span><span class="token punctuation">,</span> B <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> B<span class="token punctuation">,</span> <span class="token char">'>'</span><span class="token punctuation">,</span> C <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> C<span class="token punctuation">,</span> <span class="token char">'&lt;'</span><span class="token punctuation">,</span> D <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> A<span class="token punctuation">,</span> <span class="token char">'>'</span><span class="token punctuation">,</span> E <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> E<span class="token punctuation">,</span> <span class="token char">'&lt;'</span><span class="token punctuation">,</span> F <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> F<span class="token punctuation">,</span> <span class="token char">'>'</span><span class="token punctuation">,</span> D <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> D<span class="token punctuation">,</span> <span class="token char">'_'</span><span class="token punctuation">,</span> A <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> current <span class="token operator">=</span> A<span class="token punctuation">,</span> quota <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token class-name">pthread_mutex_t</span> lk   <span class="token operator">=</span> PTHREAD_MUTEX_INITIALIZER<span class="token punctuation">;</span>
<span class="token class-name">pthread_cond_t</span>  cond <span class="token operator">=</span> PTHREAD_COND_INITIALIZER<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token keyword">char</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">LENGTH</span><span class="token punctuation">(</span>rules<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">rule</span> <span class="token operator">*</span>rule <span class="token operator">=</span> <span class="token operator">&amp;</span>rules<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>rule<span class="token operator">-></span>from <span class="token operator">==</span> current <span class="token operator">&amp;&amp;</span> rule<span class="token operator">-></span>ch <span class="token operator">==</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> rule<span class="token operator">-></span>to<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fish_before</span><span class="token punctuation">(</span><span class="token keyword">char</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token function">next</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> quota<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// can proceed only if (next(ch) &amp;&amp; quota)</span>
    <span class="token function">pthread_cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cond<span class="token punctuation">,</span> <span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  quota<span class="token operator">--</span><span class="token punctuation">;</span>
  <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">fish_after</span><span class="token punctuation">(</span><span class="token keyword">char</span> ch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
  quota<span class="token operator">++</span><span class="token punctuation">;</span>
  current <span class="token operator">=</span> <span class="token function">next</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">assert</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">pthread_cond_broadcast</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token keyword">char</span> roles<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">".&lt;&lt;&lt;&lt;&lt;>>>>___"</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">fish_thread</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">char</span> role <span class="token operator">=</span> roles<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fish_before</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">putchar</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// can be long; no lock protection</span>
    <span class="token function">fish_after</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setbuf</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">strlen</span><span class="token punctuation">(</span>roles<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token function">create</span><span class="token punctuation">(</span>fish_thread<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="信号量-实现生产者-消费者" tabindex="-1"><a class="header-anchor" href="#信号量-实现生产者-消费者" aria-hidden="true">#</a> 信号量：实现生产者-消费者</h4>
<p>做一点扩展——线程可以任意 “变出” 一个手环</p>
<ul>
<li>把手环看成是令牌</li>
<li>得到令牌的可以进入执行</li>
<li>可以随时创建令牌</li>
</ul>
<hr>
<p>“手环” = “令牌” = “一个资源” = “信号量” (semaphore)</p>
<ul>
<li>P(&amp;sem) - prolaag = try + decrease; wait; down; in
<ul>
<li>等待一个手环后返回</li>
<li>如果此时管理员手上有空闲的手环，立即返回</li>
</ul>
</li>
<li>V(&amp;sem) - verhoog = increase; post; up; out
<ul>
<li>变出一个手环，送给管理员</li>
</ul>
</li>
</ul>
<p>信号量设计的重点</p>
<ul>
<li>考虑 “手环” (每一单位的 “资源”) 是什么，谁创造？谁获取？
<ul>
<li><a href="http://jyywiki.cn/pages/OS/2022/demos/pc-sem.c" target="_blank" rel="noopener noreferrer"><code v-pre>pc-sem.c</code><ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>void producer() {
  P(&amp;empty);   // P()返回 -> 得到手环
  printf("("); // 假设线程安全
  V(&amp;fill);
}
void consumer() {
  P(&amp;fill);
  printf(")");
  V(&amp;empty);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在 “一单位资源” 明确的问题上更好用</li>
</ul>
<h4 id="哲学家吃饭问题" tabindex="-1"><a class="header-anchor" href="#哲学家吃饭问题" aria-hidden="true">#</a> 哲学家吃饭问题</h4>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>avail<span class="token punctuation">[</span>lhs<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> avail<span class="token punctuation">[</span>rhs<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">,</span> <span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
avail<span class="token punctuation">[</span>lhs<span class="token punctuation">]</span> <span class="token operator">=</span> avail<span class="token punctuation">[</span>rhs<span class="token punctuation">]</span> <span class="token operator">=</span> false<span class="token punctuation">;</span>
<span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
avail<span class="token punctuation">[</span>lhs<span class="token punctuation">]</span> <span class="token operator">=</span> avail<span class="token punctuation">[</span>rhs<span class="token punctuation">]</span> <span class="token operator">=</span> true<span class="token punctuation">;</span>
<span class="token function">broadcast</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分布式的解决方案</p>
<p>另一方面是集中式</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">Tphilosopher</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">send_request</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> EAT<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">P</span><span class="token punctuation">(</span>allowed<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// waiter 会把叉子递给哲学家</span>
  <span class="token function">philosopher_eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">send_request</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> DONE<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">Twaiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>id<span class="token punctuation">,</span> status<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token function">receive_request</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">==</span> EAT<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>status <span class="token operator">==</span> DONE<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用一个waiter来集中给哲学家分配叉子</p>
<p>你可能会觉得，管叉子的人是性能瓶颈</p>
<ul>
<li>一大桌人吃饭，每个人都叫服务员的感觉</li>
<li>Premature optimization is the root of all evil (D. E. Knuth)</li>
</ul>
<hr>
<p>抛开 workload 谈优化就是耍流氓</p>
<ul>
<li>吃饭的时间通常远远大于请求服务员的时间</li>
<li>如果一个 manager 搞不定，可以分多个 (fast/slow path)
<ul>
<li>把系统设计好，使集中管理不成为瓶颈
<ul>
<li><a href="https://www.usenix.org/conference/nsdi20/presentation/brooker" target="_blank" rel="noopener noreferrer">Millions of tiny databases<ExternalLinkIcon/></a> (NSDI'20)</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="现实生活中的并发程序" tabindex="-1"><a class="header-anchor" href="#现实生活中的并发程序" aria-hidden="true">#</a> <strong>现实生活中的并发程序</strong></h3>
<div class="custom-container tip">
<p class="custom-container-title">并发程序遇到的主要挑战</p>
<p><strong>计算任务如何分解</strong></p>
<ul>
<li>计算图需要容易并行化
<ul>
<li>机器-线程两级任务分解</li>
</ul>
</li>
<li>生产者-消费者解决一切
<ul>
<li><a href="https://hpc-tutorials.llnl.gov/mpi/" target="_blank" rel="noopener noreferrer">MPI<ExternalLinkIcon/></a> - “a specification for the developers and users of message passing libraries”, <a href="https://www.openmp.org/" target="_blank" rel="noopener noreferrer">OpenMP<ExternalLinkIcon/></a> - “multi-platform shared-memory parallel programming in C/C++ and Fortran”</li>
</ul>
</li>
<li><a href="https://web.mit.edu/dimitrib/www/pdc.html" target="_blank" rel="noopener noreferrer">Parallel and Distributed Computation: Numerical Methods<ExternalLinkIcon/></a></li>
</ul>
<hr>
<p><strong>线程间如何通信</strong></p>
<ul>
<li>通信不仅发生在节点/线程之间，还发生在任何共享内存访问</li>
</ul>
</div>
<h4 id="数据中心-协程和线程" tabindex="-1"><a class="header-anchor" href="#数据中心-协程和线程" aria-hidden="true">#</a> 数据中心：协程和线程</h4>
<p>数据中心</p>
<ul>
<li>同一时间有数千/数万个请求到达服务器</li>
<li>计算部分
<ul>
<li>需要利用好多处理器
<ul>
<li>线程 → 这就是我擅长的 (Mandelbrot Set)</li>
<li>协程 → 一人出力，他人摸鱼</li>
</ul>
</li>
</ul>
</li>
<li>I/O 部分
<ul>
<li>会在系统调用上 block (例如请求另一个服务或读磁盘)
<ul>
<li>协程 → 一人干等，他人围观</li>
<li>线程 → 每个线程都占用可观的操作系统资源</li>
</ul>
</li>
</ul>
</li>
<li>(这个问题比你想象的复杂，例如虚拟机)</li>
</ul>
<h4 id="go-和-goroutine" tabindex="-1"><a class="header-anchor" href="#go-和-goroutine" aria-hidden="true">#</a> Go 和 Goroutine</h4>
<blockquote>
<p>Go: 小孩子才做选择，多处理器并行和轻量级并发我全都要！</p>
</blockquote>
<p>Goroutine: 概念上是线程，实际是线程和协程的混合体</p>
<ul>
<li>每个 CPU 上有一个 Go Worker，自由调度 goroutines</li>
<li>执行到 blocking API 时 (例如 sleep, read)
<ul>
<li>Go Worker 偷偷改成 non-blocking 的版本
<ul>
<li>成功 → 立即继续执行</li>
<li>失败 → 立即 yield 到另一个需要 CPU 的 goroutine
<ul>
<li>太巧妙了！CPU 和操作系统全部用到 100%</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<hr>
<p>例子</p>
<ul>
<li><a href="http://jyywiki.cn/pages/OS/2022/demos/fib.go" target="_blank" rel="noopener noreferrer">fib.go<ExternalLinkIcon/></a>;</li>
<li><a href="https://books.studygolang.com/gopl-zh/ch9/ch9-08.html" target="_blank" rel="noopener noreferrer">The Go Programming Language (ch 9.8)<ExternalLinkIcon/></a></li>
</ul>
<p>Go解决了两个大问题，一个是线程上下文切换时的开销，一个是协程在遇到IO操作时会遇到的切换线程。</p>
<p>通过channel来进行线程间的通信，避免了共享内存的麻烦。</p>
<h2 id="并发bug应对方法" tabindex="-1"><a class="header-anchor" href="#并发bug应对方法" aria-hidden="true">#</a> 并发BUG应对方法</h2>
<p>防御性编程</p>
<p>多用Assert断言来判断操作是否正确</p>
<h3 id="死锁" tabindex="-1"><a class="header-anchor" href="#死锁" aria-hidden="true">#</a> 死锁</h3>
<h4 id="aa-deadlock" tabindex="-1"><a class="header-anchor" href="#aa-deadlock" aria-hidden="true">#</a> AA-Deadlock</h4>
<p>假设你的 spinlock 不小心发生了中断</p>
<ul>
<li>在不该打开中断的时候开了中断</li>
<li>在不该切换的时候执行了 <code v-pre>yield()</code></li>
</ul>
<hr>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>void os_run() {
  spin_lock(&amp;list_lock);
  spin_lock(&amp;xxx);
  spin_unlock(&amp;xxx); // ---------+
}                          //    |
                           //    |
void on_interrupt() {      //    |
  spin_lock(&amp;list_lock);   // &lt;--+
  spin_unlock(&amp;list_lock);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="abba-deadlock" tabindex="-1"><a class="header-anchor" href="#abba-deadlock" aria-hidden="true">#</a> ABBA-Deadlock</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>void swap(int i, int j) {
  spin_lock(&amp;lock[i]);
  spin_lock(&amp;lock[j]);
  arr[i] = NULL;
  arr[j] = arr[i];
  spin_unlock(&amp;lock[j]);
  spin_unlock(&amp;lock[i]);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>上锁的顺序很重要……</p>
<ul>
<li>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>swap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本身看起来没有问题</p>
<ul>
<li><code v-pre>swap(1, 2)</code>; <code v-pre>swap(2, 3)</code>, <code v-pre>swap(3, 1)</code> → 死锁</li>
<li><a href="http://jyywiki.cn/pages/OS/2022/demos/philosopher.c" target="_blank" rel="noopener noreferrer">philosopher.c<ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<p>避免死锁</p>
<p>死锁产生的四个必要条件 (<a href="https://en.wikipedia.org/wiki/Edward_G._Coffman,_Jr." target="_blank" rel="noopener noreferrer">Edward G. Coffman<ExternalLinkIcon/></a>, 1971):</p>
<ul>
<li>互斥：一个资源每次只能被一个进程使用</li>
<li>请求与保持：一个进程请求资阻塞时，不释放已获得的资源</li>
<li>不剥夺：进程已获得的资源不能强行剥夺</li>
<li>循环等待：若干进程之间形成头尾相接的循环等待资源关系</li>
</ul>
<hr>
<blockquote>
<p>“理解了死锁的原因，尤其是产生死锁的四个必要条件，就可以最大可能地避免、预防和解除死锁。所以，在系统设计、进程调度等方面注意如何不让这四个必要条件成立，如何确定资源的合理分配算法，避免进程永久占据系统资源。此外，也要防止进程在处于等待状态的情况下占用资源。因此，对资源的分配要给予合理的规划。” ——Bullshit.</p>
</blockquote>
<h4 id="避免死锁-cont-d" tabindex="-1"><a class="header-anchor" href="#避免死锁-cont-d" aria-hidden="true">#</a> 避免死锁 (cont'd)</h4>
<p>AA-Deadlock</p>
<ul>
<li>AA 型的死锁容易检测，及早报告，及早修复</li>
<li>spinlock-xv6.c 中的各种防御性编程
<ul>
<li><code v-pre>if (holding(lk)) panic();</code></li>
</ul>
</li>
</ul>
<hr>
<p>ABBA-Deadlock</p>
<ul>
<li>任意时刻系统中的锁都是有限的</li>
<li>严格按照固定的顺序获得所有锁 (lock ordering; 消除 “循环等待”)
<ul>
<li>遇事不决可视化：<a href="http://jyywiki.cn/pages/OS/2022/demos/lock-ordering.py" target="_blank" rel="noopener noreferrer">lock-ordering.py<ExternalLinkIcon/></a></li>
<li>进而证明是安全的
<ul>
<li>“在任意时刻总是有获得 “最靠后” 锁的可以继续执行”</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="数据竞争" tabindex="-1"><a class="header-anchor" href="#数据竞争" aria-hidden="true">#</a> 数据竞争</h3>
<blockquote>
<p>不同的线程同时访问同一段内存，且至少有一个是写。</p>
</blockquote>
<ul>
<li>
<p>两个内存访问在 “赛跑”，“跑赢” 的操作先执行</p>
<ul>
<li>
<p>peterson-barrier.c</p>
<p>: 内存访问都在赛跑</p>
<ul>
<li><a href="https://www.felixcloutier.com/x86/mfence" target="_blank" rel="noopener noreferrer">MFENCE<ExternalLinkIcon/></a>：<s>如何留下最少的 fence，依然保证算法正确？</s></li>
</ul>
</li>
</ul>
</li>
</ul>
<p>用互斥锁保护数据，避免数据竞争</p>
<h3 id="其他bug" tabindex="-1"><a class="header-anchor" href="#其他bug" aria-hidden="true">#</a> 其他BUG</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// Case #1: 上错了锁</span>
<span class="token keyword">void</span> <span class="token function">thread1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">spin_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk1<span class="token punctuation">)</span><span class="token punctuation">;</span> sum<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token function">spin_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">thread2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">spin_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk2<span class="token punctuation">)</span><span class="token punctuation">;</span> sum<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token function">spin_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">// Case #2: 忘记上锁</span>
<span class="token keyword">void</span> <span class="token function">thread1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">spin_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk1<span class="token punctuation">)</span><span class="token punctuation">;</span> sum<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token function">spin_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>lk1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">thread2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> sum<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="原子性违反-av" tabindex="-1"><a class="header-anchor" href="#原子性违反-av" aria-hidden="true">#</a> 原子性违反 (AV)</h4>
<p>“ABA”</p>
<ul>
<li>我以为一段代码没啥事呢，但被人强势插入了</li>
</ul>
<figure><img src="http://jyywiki.cn/pages/OS/img/av-bug.png" alt="ABA" tabindex="0" loading="lazy"><figcaption>ABA</figcaption></figure>
<h4 id="顺序违反-ov" tabindex="-1"><a class="header-anchor" href="#顺序违反-ov" aria-hidden="true">#</a> 顺序违反 (OV)</h4>
<p>“BA”</p>
<ul>
<li>怎么就没按我预想的顺序来呢？
<ul>
<li>例子：concurrent use after free</li>
</ul>
</li>
</ul>
<figure><img src="http://jyywiki.cn/pages/OS/img/ov-bug.png" alt="OV" tabindex="0" loading="lazy"><figcaption>OV</figcaption></figure>
<h3 id="应对错误的方法" tabindex="-1"><a class="header-anchor" href="#应对错误的方法" aria-hidden="true">#</a> 应对错误的方法</h3>
<h4 id="lockdep-运行时的死锁检查" tabindex="-1"><a class="header-anchor" href="#lockdep-运行时的死锁检查" aria-hidden="true">#</a> Lockdep: 运行时的死锁检查</h4>
<p>Lockdep 规约 (Specification)</p>
<ul>
<li>为每一个锁确定唯一的 “allocation site”
<ul>
<li><a href="http://jyywiki.cn/pages/OS/2022/demos/lock-site.c" target="_blank" rel="noopener noreferrer">lock-site.c<ExternalLinkIcon/></a></li>
<li>assert: 同一个 allocation site 的锁存在全局唯一的上锁顺序</li>
</ul>
</li>
</ul>
<p>检查方法：printf</p>
<ul>
<li>记录所有观察到的上锁顺序，例如</li>
</ul>
<p>维护的其实是一个图，如果图中有环，则违背了加锁的顺序。</p>
<h4 id="threadsanitizer-运行时的数据竞争检查" tabindex="-1"><a class="header-anchor" href="#threadsanitizer-运行时的数据竞争检查" aria-hidden="true">#</a> ThreadSanitizer: 运行时的数据竞争检查</h4>
<p>为所有事件建立 happens-before 关系图</p>
<ul>
<li>Program-order + release-acquire</li>
<li>对于发生在不同线程且至少有一个是写的 x,y<em>x</em>,<em>y</em> 检查</li>
</ul>
<p>还是要依靠工具做检查！</p>
<h2 id="动态分析工具-sanitizers" tabindex="-1"><a class="header-anchor" href="#动态分析工具-sanitizers" aria-hidden="true">#</a> 动态分析工具：Sanitizers</h2>
<p>没用过 lint/sanitizers？</p>
<ul>
<li>AddressSanitizer(asan);(paper): 非法内存访问
<ul>
<li>Buffer (heap/stack/global) overflow, use-after-free, use-after-return, double-free, ...</li>
<li>Demo: <a href="http://jyywiki.cn/pages/OS/2022/demos/uaf.c" target="_blank" rel="noopener noreferrer">uaf.c<ExternalLinkIcon/></a>; <a href="https://www.kernel.org/doc/html/latest/dev-tools/kasan.html" target="_blank" rel="noopener noreferrer">kasan<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>ThreadSanitizer(tsan): 数据竞争
<ul>
<li>Demo: <a href="http://jyywiki.cn/pages/OS/2022/demos/fish.c" target="_blank" rel="noopener noreferrer">fish.c<ExternalLinkIcon/></a>, <a href="http://jyywiki.cn/pages/OS/2022/demos/sum.c" target="_blank" rel="noopener noreferrer">sum.c<ExternalLinkIcon/></a>, <a href="http://jyywiki.cn/pages/OS/2022/demos/peterson-barrier.c" target="_blank" rel="noopener noreferrer">peterson-barrier.c<ExternalLinkIcon/></a>; <a href="https://github.com/google/ktsan" target="_blank" rel="noopener noreferrer">ktsan<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://clang.llvm.org/docs/MemorySanitizer.html" target="_blank" rel="noopener noreferrer">MemorySanitizer<ExternalLinkIcon/></a> (msan): 未初始化的读取</li>
<li>UBSanitizer(ubsan): undefined behavior
<ul>
<li>Misaligned pointer, signed integer overflow, ...</li>
<li>Kernel 会带着 <code v-pre>-fwrapv</code> 编译</li>
</ul>
</li>
</ul>
</div></template>


