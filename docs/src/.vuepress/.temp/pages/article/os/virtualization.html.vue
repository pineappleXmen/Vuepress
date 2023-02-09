<template><div><h2 id="从系统启动到第一个进程" tabindex="-1"><a class="header-anchor" href="#从系统启动到第一个进程" aria-hidden="true">#</a> 从系统启动到第一个进程</h2>
<p>回顾 <a href="http://jyywiki.cn/pages/OS/2022/demos/thread-os.c" target="_blank" rel="noopener noreferrer">thread-os.c<ExternalLinkIcon/></a> 的加载过程</p>
<ul>
<li>CPU Reset → Firmware → Boot loader → Kernel <code v-pre>_start()</code></li>
</ul>
<hr>
<p>操作系统会加载 “第一个程序”</p>
<ul>
<li>RTFSC(latest Linux Kernel)
<ul>
<li>如果没有指定启动选项 <code v-pre>init=</code>，按照 “默认列表” 尝试一遍</li>
<li>从此以后，Linux Kernel 就进入后台，成为 “中断/异常处理程序”</li>
</ul>
</li>
</ul>
<hr>
<p>程序：状态机</p>
<ul>
<li>C 代码视角：语句</li>
<li>汇编/机器代码视角：指令</li>
<li>与操作系统交互的方式：syscall</li>
</ul>
</div></template>


