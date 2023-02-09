<template><div><div class="custom-container tip">
<p class="custom-container-title">关于NEMU</p>
<p>NEMU是NJU的开放课程《计算机系统基础》课程中实现的模拟计算机运行的软件。</p>
<p>该软件实现 Intel 80386 体系框架的CPU运算逻辑，运行在32位Linux操作系统。</p>
<p>按照该课程要求，本文不会对该Pa的代码进行任何公开，只对其如何实现进行概括，以便理解本模块内容。</p>
<p><strong>2020年版本</strong></p>
<p>该课程公开视频以及配置参考：</p>
<p><a href="https://www.bilibili.com/video/BV1a7411w7tC/" target="_blank" rel="noopener noreferrer">NEMU<ExternalLinkIcon/></a></p>
<p>课程指导的仓库及其镜像地址：</p>
<p><a href="http://github.com/ics-nju-wl/icspa-public-guide" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>       <a href="https://gitee.com/wlicsnju/icspa-public-guide" target="_blank" rel="noopener noreferrer">Gitee<ExternalLinkIcon/></a></p>
<p>实验框架代码及其镜像地址：</p>
<p><a href="http://github.com/ics-nju-wl/icspa-public" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a>       <a href="https://gitee.com/wlicsnju/icspa-public" target="_blank" rel="noopener noreferrer">Gitee<ExternalLinkIcon/></a></p>
<p><strong>2021年版本</strong></p>
<p>操作指南</p>
<p><a href="https://nju-projectn.github.io/ics-pa-gitbook/ics2021/index.html" target="_blank" rel="noopener noreferrer">NEMU 2021<ExternalLinkIcon/></a></p>
<p><strong>2022版本</strong></p>
<p>操作指南</p>
<p><a href="https://nju-projectn.github.io/ics-pa-gitbook/ics2022/" target="_blank" rel="noopener noreferrer">NEMU 2022<ExternalLinkIcon/></a></p>
</div>
<h2 id="pa-1-1-数据的表示和存取" tabindex="-1"><a class="header-anchor" href="#pa-1-1-数据的表示和存取" aria-hidden="true">#</a> PA-1-1 数据的表示和存取</h2>
<h3 id="对主存的模拟" tabindex="-1"><a class="header-anchor" href="#对主存的模拟" aria-hidden="true">#</a> 对主存的模拟</h3>
<p>定义在<code v-pre>nemu/src/memory/memory.c</code>中</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>uint8_t hw_mem[MEM_SIZE_B];
uint32_t vaddr_read(vaddr_t vaddr, uint8_t sreg, size_t len)
{
	assert(len == 1 || len == 2 || len == 4);
	return laddr_read(vaddr, len);
}

void vaddr_write(vaddr_t vaddr, uint8_t sreg, size_t len, uint32_t data)
{
	assert(len == 1 || len == 2 || len == 4);
	laddr_write(vaddr, len, data);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过uint_8类型数组模拟主存 共128MB</p>
<p>提供读写接口</p>
<h3 id="对通用寄存器的模拟" tabindex="-1"><a class="header-anchor" href="#对通用寄存器的模拟" aria-hidden="true">#</a> 对通用寄存器的模拟</h3>
<p>通用寄存器定义在<code v-pre>nemu/include/cpu/cpu.h</code>结构体CPU_STATE中 按照手册顺序定义</p>
<p>可以通过cpu.eax直接访问</p>
<h2 id="pa-1-1-解决思路" tabindex="-1"><a class="header-anchor" href="#pa-1-1-解决思路" aria-hidden="true">#</a> PA-1-1 解决思路</h2>
<div class="custom-container note">
<p class="custom-container-title">C语言中 union 与 struct区别</p>
<p><code v-pre>struct</code>中的每一项单独占据一块内存</p>
<p>而对于<code v-pre>union</code>来说 每一项是共享内存的</p>
<p>对于通用寄存器EAX来说 AL AH是EAX的低位和高位 与EAX是共享的 因此应该使用</p>
<p><code v-pre>union</code>来表示</p>
</div>
<h2 id="pa1-2-整数的表示和读取" tabindex="-1"><a class="header-anchor" href="#pa1-2-整数的表示和读取" aria-hidden="true">#</a> PA1-2 整数的表示和读取</h2>
</div></template>


