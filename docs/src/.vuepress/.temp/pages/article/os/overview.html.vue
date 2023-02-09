<template><div><p>本章内容通过<strong>基础知识</strong> + <strong>课程实践</strong>的方法 一起学习操作系统的具体知识</p>
<p>本模块分为以下几节</p>
<div class="custom-container tip">
<p class="custom-container-title">操作系统基础</p>
<p><a href="">程序与编译器</a></p>
</div>
<p>与本模块配合的公开课</p>
<div class="custom-container tip">
<p class="custom-container-title">NJU OS 公开课地址</p>
<p><a href="https://www.bilibili.com/video/BV1Cm4y1d7Ur/" target="_blank" rel="noopener noreferrer">视频地址<ExternalLinkIcon/></a></p>
<p><a href="http://jyywiki.cn/OS/2022/" target="_blank" rel="noopener noreferrer">课程主页<ExternalLinkIcon/></a></p>
</div>
<h2 id="操作系统的主要任务" tabindex="-1"><a class="header-anchor" href="#操作系统的主要任务" aria-hidden="true">#</a> <strong>操作系统的主要任务</strong></h2>
<ul>
<li>
<p><strong>进程调度</strong>：一台计算机有一个或多个中央处理单元（CPU），它们执行程序的指令。与其他 UNIX 系统一样，Linux 是一种抢占式多任务操作系统，多任务意味着多个进程（即正在运行的程序）可以同时驻留在内存中，并且每个进程都可以使用 CPU。抢占式意味着管理哪些进程接收 CPU 使用权以及使用多长时间的规则由内核进程调度程序（而不是进程本身）确定。</p>
</li>
<li>
<p><strong>内存管理</strong>：虽然计算机内存在十年或两年前的标准下是巨大的，但软件的大小也相应增长，因此物理内存 (RAM) 仍然是内核必须在进程之间以公平和高效的方式共享的有限资源时尚。与大多数现代操作系统一样，Linux 采用虚拟内存管理（第 6.4 节），该技术具有两个主要优点： – 进程彼此隔离，并且与内核隔离，因此一个进程无法读取或修改另一个进程的内存进程或内核。 – 只需要将部分进程保存在内存中，从而降低每个进程的内存需求，并允许更多进程同时保存在 RAM 中。这会导致更好的 CPU 利用率，因为它增加了在任何时刻至少有一个 CPU 可以执行的进程的可能性。</p>
</li>
<li>
<p><strong>提供文件系统</strong>：内核在磁盘上提供文件系统，允许创建、检索、更新、删除文件等。</p>
</li>
<li>
<p><strong>进程的创建和终止</strong>：内核可以将新程序加载到内存中，为它提供运行所需的资源（例如，CPU、内存和对文件的访问）。这种正在运行的程序的实例称为进程。一旦一个进程完成执行，内核确保它使用的资源被释放以供以后的程序重用。</p>
</li>
<li>
<p><strong>访问设备</strong>：连接到计算机的设备（鼠标、显示器、键盘、磁盘和磁带驱动器等）允许计算机与外部世界之间进行信息通信，允许输入、输出或两者兼而有之。内核为程序提供了一个接口，可以标准化和简化对设备的访问，同时仲裁多个进程对每个设备的访问。</p>
</li>
<li>
<p><strong>网络</strong>：内核代表用户进程传输和接收网络消息（数据包）。此任务包括将网络数据包路由到目标系统。</p>
</li>
<li>
<p><strong>提供系统调用应用程序编程接口 (API)</strong>：进程可以请求内核使用称为系统调用的内核入口点执行各种任务。 Linux 系统调用 API 是本书的主要主题。 3.1 节详细介绍了进程执行系统调用时发生的步骤。</p>
</li>
</ul>
</div></template>


