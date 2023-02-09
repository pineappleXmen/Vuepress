---
lang: zh-CN
title: 操作系统的状态机模型和应用
description: 操作系统基础概念
category: 
 - Linux
tag:
 - OS
---

操作系统的最初的命令中，内存里空无一物，初始的指令是如何加载的呢？

## Bare-metal 与程序员的约定

为了让计算机能运行任何我们的程序，一定存在软件/硬件的约定

- CPU reset 后，处理器处于某个确定的状态
  - PC 指针一般指向一段 memory-mapped ROM
    - ROM 存储了厂商提供的 firmware (固件)
  - 处理器的大部分特性处于关闭状态
    - 缓存、虚拟存储、……
- Firmware (固件，厂商提供的代码)
  - 将用户数据加载到内存
    - 例如存储介质上的第二级 loader (加载器)
    - 或者直接加载操作系统 (嵌入式系统)

## x86 Family: CPU Reset 行为

CPU Reset ([Intel® 64 and IA-32 Architectures Software Developer’s Manual](https://software.intel.com/en-us/articles/intel-sdm), Volume 3A/3B)

- 寄存器会有初始状态

  - `EIP = 0x0000fff0`

  - ```
    CR0 = 0x60000010
    ```

    - 16-bit 模式

  - ```
    EFLAGS = 0x00000002
    ```

    - interrupt disabled

- TFM (5,000 页 by 2019)

  - 最需要的 Volume 3A 只有 468 页

![intel x86](http://jyywiki.cn/pages/OS/img/intel-cpu-reset.png)

厂商会根据手册规定初始化PC，在初始化后运行厂商代码。

厂商代码是一块在RAM写死的代码，扫描系统设备。