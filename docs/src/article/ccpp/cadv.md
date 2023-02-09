---
lang: zh-CN
title: C语言进阶
description: 
category: 
 - C
tag:
 - C
---

## **内联汇编**

::: tip 内联汇编

**内联汇编**（**Inline assembly**）是**部分编译器**支持的一种功能。可以将**汇编语言**内嵌在高级语言源代码中。

编译器GCC(GNU Compiler for Linux)  提供C语言的汇编功能。

[GCC内联汇编文档](http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html#s4)

:::

### **基本内联汇编**

基本内联汇编语法

```c
asm [volatile] ("opcode")        //opcode 采用 AT&T/UNIX assembly syntax.
__asm__ [volatile] ("opcode")
```

`asm`和`__asm__`均可以使用，当asm与其他关键字发生冲突时使用第二个。

如果有超过一个汇编命令在同一个命令中，需要在结尾加上`\n` 和 `\t`，这是因为每一条命令是用字符串的形式发送给编译器（GAS），需要保证一定的格式。

```c
__asm__ ("movl %eax, %ebx\n\t"
          "movl $56, %esi\n\t"
          "movl %ecx, $label(%edx,%ebx,$4)\n\t"
          "movb %ah, (%ebx)");
```

### **扩展内联汇编**

[扩展内联汇编文档](http://www.ibiblio.org/gferg/ldp/GCC-Inline-Assembly-HOWTO.html#s5)

扩展内联汇编语法

```c
asm [volatile] ( assembler template 
           : output operands                  
           : input operands                   
           : list of clobbered registers      
           );
asm [volatile] ("汇编指令" 
                : "输出操作数列表" 
                : "输入操作数列表" 
                : "破坏清单"
               );
```

### 操作数格式(operand format)

```c
"[Constraint Modifiers](Constraint)" (Addr)
"[约束修饰符]约束" (寄存器或内存地址)
```

如果要用多个操作数，需要用逗号隔开。每个操作数可以用数字标识，如果一共有n个操作数，那么输出列表中的第一个为"0"，依次排序，到输入列表的最后一个为"n-1"。

输出操作数必须为左值。

```c
asm ("leal (%1,%1,4), %0"
             : "=r" (five_times_x)
             : "r" (x) 
             );
```

在上述的例子中，输入的操作数存入`x`中，这里并没有指定具体的寄存器，GCC编译器会帮助我们选择使用的寄存器。上述通过`lea`命令将存在x中的数字乘以5。

### 破坏清单 （Clobber List）

由于内联汇编命令可能会破坏某些寄存器中的值，而这不会被GCC编译器知道，可能会引起一些错误，所以我们需要将**"被破坏的寄存器"**通知给编译器。





### **lock 关键字**

```c
__asm__ __volatile__(
                      "   lock       ;\n"
                      "   addl %1,%0 ;\n"
                      : "=m"  (my_var)
                      : "ir"  (my_int), "m" (my_var)
                      :                /* no clobber-list */
                      );
```

如果加上了lock命令，表示这一条汇编命令为一条原子性的命令。

上述的命令是一条原子加法命令