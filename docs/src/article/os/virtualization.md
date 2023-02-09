---
lang: zh-CN
title: 虚拟化
description: Linux操作系统
category: 
 - Linux
tag:
 - OS
 - 线程
---

## 从系统启动到第一个进程

回顾 [thread-os.c](http://jyywiki.cn/pages/OS/2022/demos/thread-os.c) 的加载过程

- CPU Reset → Firmware → Boot loader → Kernel `_start()`

------

操作系统会加载 “第一个程序”

- RTFSC(latest Linux Kernel)
  - 如果没有指定启动选项 `init=`，按照 “默认列表” 尝试一遍
  - 从此以后，Linux Kernel 就进入后台，成为 “中断/异常处理程序”

------

程序：状态机

- C 代码视角：语句
- 汇编/机器代码视角：指令
- 与操作系统交互的方式：syscall