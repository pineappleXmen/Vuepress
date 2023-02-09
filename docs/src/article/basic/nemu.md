---
lang: zh-CN
title: NEMU
description: CPU的模拟
category: 
 - Computer
tag:
 - Pa
---

::: tip 关于NEMU

NEMU是NJU的开放课程《计算机系统基础》课程中实现的模拟计算机运行的软件。

该软件实现 Intel 80386 体系框架的CPU运算逻辑，运行在32位Linux操作系统。

按照该课程要求，本文不会对该Pa的代码进行任何公开，只对其如何实现进行概括，以便理解本模块内容。

**2020年版本**

该课程公开视频以及配置参考：

[NEMU](https://www.bilibili.com/video/BV1a7411w7tC/)

课程指导的仓库及其镜像地址：

[Github](http://github.com/ics-nju-wl/icspa-public-guide)       [Gitee](https://gitee.com/wlicsnju/icspa-public-guide)

实验框架代码及其镜像地址：

[GitHub](http://github.com/ics-nju-wl/icspa-public)       [Gitee](https://gitee.com/wlicsnju/icspa-public)

**2021年版本**

操作指南

[NEMU 2021](https://nju-projectn.github.io/ics-pa-gitbook/ics2021/index.html)

**2022版本**

操作指南

[NEMU 2022](https://nju-projectn.github.io/ics-pa-gitbook/ics2022/)

:::

## PA-1-1 数据的表示和存取

### 对主存的模拟

定义在`nemu/src/memory/memory.c`中

```
uint8_t hw_mem[MEM_SIZE_B];
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
```

通过uint_8类型数组模拟主存 共128MB

提供读写接口

### 对通用寄存器的模拟

通用寄存器定义在`nemu/include/cpu/cpu.h`结构体CPU_STATE中 按照手册顺序定义

可以通过cpu.eax直接访问

## PA-1-1 解决思路

::: note C语言中 union 与 struct区别

`struct`中的每一项单独占据一块内存

而对于`union`来说 每一项是共享内存的

对于通用寄存器EAX来说 AL AH是EAX的低位和高位 与EAX是共享的 因此应该使用

`union`来表示

:::

## PA1-2 整数的表示和读取