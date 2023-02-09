---
lang: zh-CN
title: 汇编架构与指令
description: 汇编语言相关
category: 
 - Computer Concept
tag:
 - asm
---

::: tip 本节要点

C语言如何在CPU上运行

80386框架汇编指令

:::

## **80386 汇编指令**

本节主要为对Intel 80386 的常见指令的解析 帮助理解机器码的具体作用

::: tip Intel 80386

**Intel 80386**，是[英特尔](https://zh.wikipedia.org/wiki/英特尔)（Intel）公司的一款[x86](https://zh.wikipedia.org/wiki/X86)系列[CPU](https://zh.wikipedia.org/wiki/CPU)，最初发布于1985年10月17日。

80386处理器被广泛应用在1980年代中期到1990年代中期的[IBM PC兼容机](https://zh.wikipedia.org/wiki/IBM_PC兼容机)中。这些PC被称为“80386电脑”或“386电脑”，有时也简称“**80386**”或“**(i)386**”。

:::

::: note 80386 手册

[80386](https://pdos.csail.mit.edu/6.828/2005/readings/i386/toc.htm)

[80386 opcode](https://pdos.csail.mit.edu/6.828/2005/readings/i386/c17.htm)

:::

### ADC -- Add with Carry

#### Operation

```
DEST := DEST + SRC + CF;
```

ADC是带进位的加法命令，其作用是将源操作数和目标操作数以及进位寄存器中的数字相加 CF为eflag中的进位寄存器 在计算发生进位时会设置为1

需要注意的是在ADC实现的命令中 源操作数和目标操作数的位数基本一致，只有83号不一致，这时候需要对这个8位的立即数进行符号扩展（sign-extension）

如 1011 0000  变为 1111 1111 1011 0000 将高位用符号位的数字进行扩展。

这种情况在ADD SUB等操作中均有出现，需要注意。



### ADD -- Add

#### Operation

```
DEST := DEST + SRC;
```

不带进位的加法。



### AND -- Logical AND

#### Operation

```
DEST := DEST AND SRC;
CF := 0;
OF := 0;
```

按位与运算

由于不会发生进位和符号翻转 所以eflags中的CF（进位寄存器） OF（符号翻转寄存器）均设为0。



### CALL -- Call Procedure

#### Operation

```
IF rel16 or rel32 type of call
THEN (* near relative call *)
   IF OperandSize = 16
   THEN
      Push(IP);
      EIP := (EIP + rel16) AND 0000FFFFH;
   ELSE (* OperandSize = 32 *)
      Push(EIP);
      EIP := EIP + rel32;
   FI;
FI;

IF r/m16 or r/m32 type of call
THEN (* near absolute call *)
   IF OperandSize = 16
   THEN
      Push(IP);
      EIP := [r/m16] AND 0000FFFFH;
   ELSE (* OperandSize = 32 *)
      Push(EIP);
      EIP := [r/m32];
   FI;
FI;
```

调用某个进程。需要将此时的eip（指向下一条指令的寄存器）保存（push压入栈中）

随后将跳入的进程的eip值赋值给eip完成跳转



### CMP -- Compare Two Operands

#### Operation

```
LeftSRC - SignExtend(RightSRC);
(* CMP does not store a result; its purpose is to set the flags *)
```

将源操作数减去经过符号扩展后的目标操作数。不保存该值，只设置符号位。



### DEC -- Decrement by 1

#### Operation

```
DEST := DEST - 1;
```

自减1



### DIV -- Unsigned Divide

#### Operation

```
temp := dividend / divisor;
IF temp does not fit in quotient
THEN Interrupt 0;
ELSE
   quotient := temp;
   remainder := dividend MOD (r/m);
FI;
```

无符号除法



### IDIV -- Signed Divide

#### Operation

```
temp := dividend / divisor;
IF temp does not fit in quotient
THEN Interrupt 0;
ELSE
   quotient := temp;
   remainder := dividend MOD (r/m);
FI;
```

有符号除法



### INC -- Increment by 1

#### Operation

```
DEST := DEST + 1;
```

自增1



### Jcc -- Jump if Condition is Met

#### Operation

```
IF condition
THEN
   EIP := EIP + SignExtend(rel8/16/32);
   IF OperandSize = 16
   THEN EIP := EIP AND 0000FFFFH;
   FI;
FI;
```

如果满足condition中的条件 那么就跳转到某地址



### JMP -- Jump

#### Operation

```
IF instruction = relative JMP
   (* i.e. operand is rel8, rel16, or rel32 *)
THEN
   EIP := EIP + rel8/16/32;
   IF OperandSize = 16
   THEN EIP := EIP AND 0000FFFFH;
   FI;
FI;
IF instruction = near indirect JMP
   (* i.e. operand is r/m16 or r/m32 *)
THEN
   IF OperandSize = 16
   THEN
      EIP := [r/m16] AND 0000FFFFH;
   ELSE (* OperandSize = 32 *)
      EIP := [r/m32];
   FI;
FI;
```

跳转到某地址

### LEA -- Load Effective Address

#### Operation

```
IF OperandSize = 16 AND AddressSize = 16
THEN r16 := Addr(m);
ELSE
   IF OperandSize = 16 AND AddressSize = 32
   THEN
      r16 := Truncate_to_16bits(Addr(m));   (* 32-bit address *)
   ELSE
      IF OperandSize = 32 AND AddressSize = 16
      THEN
         r32 := Truncate_to_16bits(Addr(m));
      ELSE
         IF OperandSize = 32 AND AddressSize = 32
         THEN  r32 := Addr(m);
         FI;
      FI;
   FI;
FI;
```

将源操作数的**有效地址**存入目标操作数的地址

### LEAVE -- High Level Procedure Exit

#### Operation

```
IF StackAddrSize = 16
THEN
   SP := BP;
ELSE (* StackAddrSize = 32 *)
   ESP := EBP;
FI;
IF OperandSize = 16
THEN
   BP := Pop();
ELSE (* OperandSize = 32 *)
   EBP := Pop();
FI;
```

与ENTER配合使用，相当于退出一个栈帧

将基地址ebp的值赋值给esp指针 随后将之前保存在栈中的ebp值pop出来 赋值给ebp

是一种高级别的退出程序

### MOV -- Move Data

#### Operation

```
DEST := SRC;
```

将源操作数地址的数据移动到目标操作数地址

与LEA的区别在于 LEA移动的是地址 而MOV移动的是地址指向的数据

### PUSH -- Push Operand onto the Stack

#### Operation

```
IF StackAddrSize = 16
THEN
   IF OperandSize = 16 THEN
      SP := SP - 2;
      (SS:SP) := (SOURCE); (* word assignment *)
   ELSE
      SP := SP - 4;
      (SS:SP) := (SOURCE); (* dword assignment *)
   FI;
ELSE (* StackAddrSize = 32 *)
   IF OperandSize = 16
   THEN
      ESP := ESP - 2;
      (SS:ESP) := (SOURCE); (* word assignment *)
   ELSE
      ESP := ESP - 4;
      (SS:ESP) := (SOURCE); (* dword assignment *)
   FI;
FI;
```

压栈操作 先将栈顶指针esp - 4（32bit）（栈顶由高地址向低地址增长） 再将数据压入新栈顶



### POP -- Pop a Word from the Stack

#### Operation

```
IF StackAddrSize = 16
THEN
   IF OperandSize = 16
   THEN
      DEST := (SS:SP); (* copy a word *)
      SP := SP + 2;
   ELSE (* OperandSize = 32 *)
      DEST := (SS:SP); (* copy a dword *)
      SP := SP + 4;
   FI;
ELSE (* StackAddrSize = 32 * )
   IF OperandSize = 16
   THEN
      DEST := (SS:ESP); (* copy a word *)
      ESP := ESP + 2;
   ELSE (* OperandSize = 32 *)
      DEST := (SS:ESP); (* copy a dword *)
      ESP := ESP + 4;
   FI;
FI;
```

出栈操作 将栈顶元素赋值给目标地址 随后将栈顶指针+4 与PUSH相反



### RET -- Return from Procedure

#### Operation

```
IF instruction = near RET
THEN;
   IF OperandSize = 16
   THEN
      IP := Pop();
      EIP := EIP AND 0000FFFFH;
   ELSE (* OperandSize = 32 *)
      EIP := Pop();
   FI;
   IF instruction has immediate operand THEN eSP := eSP + imm16; FI;
FI;

IF (PE = 0 OR (PE = 1 AND VM = 1))
   (* real mode or virtual 8086 mode *)
   AND instruction = far RET
THEN;
   IF OperandSize = 16
   THEN
      IP := Pop();
      EIP := EIP AND 0000FFFFH;
      CS := Pop(); (* 16-bit pop *)
   ELSE (* OperandSize = 32 *)
      EIP := Pop();
      CS := Pop(); (* 32-bit pop, high-order 16-bits discarded *)
   FI;
   IF instruction has immediate operand THEN eSP := eSP + imm16; FI;
FI;
```

与CALL 命令相对应 弹出CALL命令压入栈的eip 随后赋值给eip 相当于完成跳回主程序的操作



### SUB -- Integer Subtraction

#### Operation

```
IF SRC is a byte and DEST is a word or dword
THEN DEST := DEST - SignExtend(SRC);
ELSE DEST := DEST - SRC;
FI;
```

减法





## **80486 汇编指令**

部分指令与80386相同，不再赘述。

### XCHG - Exchange Register/Memory with Register

#### Operation

```assembly
temp <- DEST
DEST <- SRC
SRC <- temp
```

The XCHG instruction exchanges two operands. The operands can be in either order. If a memory operand is involved, the LOCK# signal is asserted for the duration of the
exchange, regardless of the presence or absence of the LOCK prefix or of the value of the IOPL.

硬件实现原子性的指令，可以原子交换两个值 在asm内联汇编中可以用lock表明。



## x86 汇编命令

::: tip x86 汇编命令手册

[x86 手册](https://www.felixcloutier.com/x86/index.html)

:::