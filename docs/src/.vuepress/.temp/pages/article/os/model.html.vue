<template><div><p>操作系统的最初的命令中，内存里空无一物，初始的指令是如何加载的呢？</p>
<h2 id="bare-metal-与程序员的约定" tabindex="-1"><a class="header-anchor" href="#bare-metal-与程序员的约定" aria-hidden="true">#</a> Bare-metal 与程序员的约定</h2>
<p>为了让计算机能运行任何我们的程序，一定存在软件/硬件的约定</p>
<ul>
<li>CPU reset 后，处理器处于某个确定的状态
<ul>
<li>PC 指针一般指向一段 memory-mapped ROM
<ul>
<li>ROM 存储了厂商提供的 firmware (固件)</li>
</ul>
</li>
<li>处理器的大部分特性处于关闭状态
<ul>
<li>缓存、虚拟存储、……</li>
</ul>
</li>
</ul>
</li>
<li>Firmware (固件，厂商提供的代码)
<ul>
<li>将用户数据加载到内存
<ul>
<li>例如存储介质上的第二级 loader (加载器)</li>
<li>或者直接加载操作系统 (嵌入式系统)</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="x86-family-cpu-reset-行为" tabindex="-1"><a class="header-anchor" href="#x86-family-cpu-reset-行为" aria-hidden="true">#</a> x86 Family: CPU Reset 行为</h2>
<p>CPU Reset (<a href="https://software.intel.com/en-us/articles/intel-sdm" target="_blank" rel="noopener noreferrer">Intel® 64 and IA-32 Architectures Software Developer’s Manual<ExternalLinkIcon/></a>, Volume 3A/3B)</p>
<ul>
<li>
<p>寄存器会有初始状态</p>
<ul>
<li>
<p><code v-pre>EIP = 0x0000fff0</code></p>
</li>
<li>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>CR0 = 0x60000010
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>16-bit 模式</li>
</ul>
</li>
<li>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>EFLAGS = 0x00000002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>interrupt disabled</li>
</ul>
</li>
</ul>
</li>
<li>
<p>TFM (5,000 页 by 2019)</p>
<ul>
<li>最需要的 Volume 3A 只有 468 页</li>
</ul>
</li>
</ul>
<figure><img src="http://jyywiki.cn/pages/OS/img/intel-cpu-reset.png" alt="intel x86" tabindex="0" loading="lazy"><figcaption>intel x86</figcaption></figure>
<p>厂商会根据手册规定初始化PC，在初始化后运行厂商代码。</p>
<p>厂商代码是一块在RAM写死的代码，扫描系统设备。</p>
</div></template>


