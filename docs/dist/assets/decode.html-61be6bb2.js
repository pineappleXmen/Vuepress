import{_ as d,V as r,W as s,Y as e,Z as i,$ as a,a0 as l,D as t}from"./framework-3845b112.js";const c={},v=e("div",{class:"custom-container tip"},[e("p",{class:"custom-container-title"},"本节要点"),e("p",null,"C语言如何在CPU上运行"),e("p",null,"80386框架汇编指令")],-1),o=e("h2",{id:"_80386-汇编指令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_80386-汇编指令","aria-hidden":"true"},"#"),i(),e("strong",null,"80386 汇编指令")],-1),u=e("p",null,"本节主要为对Intel 80386 的常见指令的解析 帮助理解机器码的具体作用",-1),h={class:"custom-container tip"},m=e("p",{class:"custom-container-title"},"Intel 80386",-1),p=e("strong",null,"Intel 80386",-1),b={href:"https://zh.wikipedia.org/wiki/%E8%8B%B1%E7%89%B9%E5%B0%94",target:"_blank",rel:"noopener noreferrer"},E={href:"https://zh.wikipedia.org/wiki/X86",target:"_blank",rel:"noopener noreferrer"},S={href:"https://zh.wikipedia.org/wiki/CPU",target:"_blank",rel:"noopener noreferrer"},x={href:"https://zh.wikipedia.org/wiki/IBM_PC%E5%85%BC%E5%AE%B9%E6%9C%BA",target:"_blank",rel:"noopener noreferrer"},g=e("strong",null,"80386",-1),I=e("strong",null,"(i)386",-1),P={class:"custom-container note"},F=e("p",{class:"custom-container-title"},"80386 手册",-1),f={href:"https://pdos.csail.mit.edu/6.828/2005/readings/i386/toc.htm",target:"_blank",rel:"noopener noreferrer"},_={href:"https://pdos.csail.mit.edu/6.828/2005/readings/i386/c17.htm",target:"_blank",rel:"noopener noreferrer"},T=l(`<h3 id="adc-add-with-carry" tabindex="-1"><a class="header-anchor" href="#adc-add-with-carry" aria-hidden="true">#</a> ADC -- Add with Carry</h3><h4 id="operation" tabindex="-1"><a class="header-anchor" href="#operation" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := DEST + SRC + CF;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ADC是带进位的加法命令，其作用是将源操作数和目标操作数以及进位寄存器中的数字相加 CF为eflag中的进位寄存器 在计算发生进位时会设置为1</p><p>需要注意的是在ADC实现的命令中 源操作数和目标操作数的位数基本一致，只有83号不一致，这时候需要对这个8位的立即数进行符号扩展（sign-extension）</p><p>如 1011 0000 变为 1111 1111 1011 0000 将高位用符号位的数字进行扩展。</p><p>这种情况在ADD SUB等操作中均有出现，需要注意。</p><h3 id="add-add" tabindex="-1"><a class="header-anchor" href="#add-add" aria-hidden="true">#</a> ADD -- Add</h3><h4 id="operation-1" tabindex="-1"><a class="header-anchor" href="#operation-1" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := DEST + SRC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不带进位的加法。</p><h3 id="and-logical-and" tabindex="-1"><a class="header-anchor" href="#and-logical-and" aria-hidden="true">#</a> AND -- Logical AND</h3><h4 id="operation-2" tabindex="-1"><a class="header-anchor" href="#operation-2" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := DEST AND SRC;
CF := 0;
OF := 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按位与运算</p><p>由于不会发生进位和符号翻转 所以eflags中的CF（进位寄存器） OF（符号翻转寄存器）均设为0。</p><h3 id="call-call-procedure" tabindex="-1"><a class="header-anchor" href="#call-call-procedure" aria-hidden="true">#</a> CALL -- Call Procedure</h3><h4 id="operation-3" tabindex="-1"><a class="header-anchor" href="#operation-3" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF rel16 or rel32 type of call
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用某个进程。需要将此时的eip（指向下一条指令的寄存器）保存（push压入栈中）</p><p>随后将跳入的进程的eip值赋值给eip完成跳转</p><h3 id="cmp-compare-two-operands" tabindex="-1"><a class="header-anchor" href="#cmp-compare-two-operands" aria-hidden="true">#</a> CMP -- Compare Two Operands</h3><h4 id="operation-4" tabindex="-1"><a class="header-anchor" href="#operation-4" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LeftSRC - SignExtend(RightSRC);
(* CMP does not store a result; its purpose is to set the flags *)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将源操作数减去经过符号扩展后的目标操作数。不保存该值，只设置符号位。</p><h3 id="dec-decrement-by-1" tabindex="-1"><a class="header-anchor" href="#dec-decrement-by-1" aria-hidden="true">#</a> DEC -- Decrement by 1</h3><h4 id="operation-5" tabindex="-1"><a class="header-anchor" href="#operation-5" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := DEST - 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>自减1</p><h3 id="div-unsigned-divide" tabindex="-1"><a class="header-anchor" href="#div-unsigned-divide" aria-hidden="true">#</a> DIV -- Unsigned Divide</h3><h4 id="operation-6" tabindex="-1"><a class="header-anchor" href="#operation-6" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>temp := dividend / divisor;
IF temp does not fit in quotient
THEN Interrupt 0;
ELSE
   quotient := temp;
   remainder := dividend MOD (r/m);
FI;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>无符号除法</p><h3 id="idiv-signed-divide" tabindex="-1"><a class="header-anchor" href="#idiv-signed-divide" aria-hidden="true">#</a> IDIV -- Signed Divide</h3><h4 id="operation-7" tabindex="-1"><a class="header-anchor" href="#operation-7" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>temp := dividend / divisor;
IF temp does not fit in quotient
THEN Interrupt 0;
ELSE
   quotient := temp;
   remainder := dividend MOD (r/m);
FI;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有符号除法</p><h3 id="inc-increment-by-1" tabindex="-1"><a class="header-anchor" href="#inc-increment-by-1" aria-hidden="true">#</a> INC -- Increment by 1</h3><h4 id="operation-8" tabindex="-1"><a class="header-anchor" href="#operation-8" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := DEST + 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>自增1</p><h3 id="jcc-jump-if-condition-is-met" tabindex="-1"><a class="header-anchor" href="#jcc-jump-if-condition-is-met" aria-hidden="true">#</a> Jcc -- Jump if Condition is Met</h3><h4 id="operation-9" tabindex="-1"><a class="header-anchor" href="#operation-9" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF condition
THEN
   EIP := EIP + SignExtend(rel8/16/32);
   IF OperandSize = 16
   THEN EIP := EIP AND 0000FFFFH;
   FI;
FI;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果满足condition中的条件 那么就跳转到某地址</p><h3 id="jmp-jump" tabindex="-1"><a class="header-anchor" href="#jmp-jump" aria-hidden="true">#</a> JMP -- Jump</h3><h4 id="operation-10" tabindex="-1"><a class="header-anchor" href="#operation-10" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF instruction = relative JMP
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳转到某地址</p><h3 id="lea-load-effective-address" tabindex="-1"><a class="header-anchor" href="#lea-load-effective-address" aria-hidden="true">#</a> LEA -- Load Effective Address</h3><h4 id="operation-11" tabindex="-1"><a class="header-anchor" href="#operation-11" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF OperandSize = 16 AND AddressSize = 16
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将源操作数的<strong>有效地址</strong>存入目标操作数的地址</p><h3 id="leave-high-level-procedure-exit" tabindex="-1"><a class="header-anchor" href="#leave-high-level-procedure-exit" aria-hidden="true">#</a> LEAVE -- High Level Procedure Exit</h3><h4 id="operation-12" tabindex="-1"><a class="header-anchor" href="#operation-12" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF StackAddrSize = 16
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与ENTER配合使用，相当于退出一个栈帧</p><p>将基地址ebp的值赋值给esp指针 随后将之前保存在栈中的ebp值pop出来 赋值给ebp</p><p>是一种高级别的退出程序</p><h3 id="mov-move-data" tabindex="-1"><a class="header-anchor" href="#mov-move-data" aria-hidden="true">#</a> MOV -- Move Data</h3><h4 id="operation-13" tabindex="-1"><a class="header-anchor" href="#operation-13" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DEST := SRC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将源操作数地址的数据移动到目标操作数地址</p><p>与LEA的区别在于 LEA移动的是地址 而MOV移动的是地址指向的数据</p><h3 id="push-push-operand-onto-the-stack" tabindex="-1"><a class="header-anchor" href="#push-push-operand-onto-the-stack" aria-hidden="true">#</a> PUSH -- Push Operand onto the Stack</h3><h4 id="operation-14" tabindex="-1"><a class="header-anchor" href="#operation-14" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF StackAddrSize = 16
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压栈操作 先将栈顶指针esp - 4（32bit）（栈顶由高地址向低地址增长） 再将数据压入新栈顶</p><h3 id="pop-pop-a-word-from-the-stack" tabindex="-1"><a class="header-anchor" href="#pop-pop-a-word-from-the-stack" aria-hidden="true">#</a> POP -- Pop a Word from the Stack</h3><h4 id="operation-15" tabindex="-1"><a class="header-anchor" href="#operation-15" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF StackAddrSize = 16
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出栈操作 将栈顶元素赋值给目标地址 随后将栈顶指针+4 与PUSH相反</p><h3 id="ret-return-from-procedure" tabindex="-1"><a class="header-anchor" href="#ret-return-from-procedure" aria-hidden="true">#</a> RET -- Return from Procedure</h3><h4 id="operation-16" tabindex="-1"><a class="header-anchor" href="#operation-16" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF instruction = near RET
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与CALL 命令相对应 弹出CALL命令压入栈的eip 随后赋值给eip 相当于完成跳回主程序的操作</p><h3 id="sub-integer-subtraction" tabindex="-1"><a class="header-anchor" href="#sub-integer-subtraction" aria-hidden="true">#</a> SUB -- Integer Subtraction</h3><h4 id="operation-17" tabindex="-1"><a class="header-anchor" href="#operation-17" aria-hidden="true">#</a> Operation</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>IF SRC is a byte and DEST is a word or dword
THEN DEST := DEST - SignExtend(SRC);
ELSE DEST := DEST - SRC;
FI;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>减法</p><h2 id="_80486-汇编指令" tabindex="-1"><a class="header-anchor" href="#_80486-汇编指令" aria-hidden="true">#</a> <strong>80486 汇编指令</strong></h2><p>部分指令与80386相同，不再赘述。</p><h3 id="xchg-exchange-register-memory-with-register" tabindex="-1"><a class="header-anchor" href="#xchg-exchange-register-memory-with-register" aria-hidden="true">#</a> XCHG - Exchange Register/Memory with Register</h3><h4 id="operation-18" tabindex="-1"><a class="header-anchor" href="#operation-18" aria-hidden="true">#</a> Operation</h4><div class="language-assembly line-numbers-mode" data-ext="assembly"><pre class="language-assembly"><code>temp &lt;- DEST
DEST &lt;- SRC
SRC &lt;- temp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The XCHG instruction exchanges two operands. The operands can be in either order. If a memory operand is involved, the LOCK# signal is asserted for the duration of the exchange, regardless of the presence or absence of the LOCK prefix or of the value of the IOPL.</p><p>硬件实现原子性的指令，可以原子交换两个值 在asm内联汇编中可以用lock表明。</p><h2 id="x86-汇编命令" tabindex="-1"><a class="header-anchor" href="#x86-汇编命令" aria-hidden="true">#</a> x86 汇编命令</h2>`,88),O={class:"custom-container tip"},D=e("p",{class:"custom-container-title"},"x86 汇编命令手册",-1),N={href:"https://www.felixcloutier.com/x86/index.html",target:"_blank",rel:"noopener noreferrer"};function C(A,H){const n=t("ExternalLinkIcon");return r(),s("div",null,[v,o,u,e("div",h,[m,e("p",null,[p,i("，是"),e("a",b,[i("英特尔"),a(n)]),i("（Intel）公司的一款"),e("a",E,[i("x86"),a(n)]),i("系列"),e("a",S,[i("CPU"),a(n)]),i("，最初发布于1985年10月17日。")]),e("p",null,[i("80386处理器被广泛应用在1980年代中期到1990年代中期的"),e("a",x,[i("IBM PC兼容机"),a(n)]),i("中。这些PC被称为“80386电脑”或“386电脑”，有时也简称“"),g,i("”或“"),I,i("”。")])]),e("div",P,[F,e("p",null,[e("a",f,[i("80386"),a(n)])]),e("p",null,[e("a",_,[i("80386 opcode"),a(n)])])]),T,e("div",O,[D,e("p",null,[e("a",N,[i("x86 手册"),a(n)])])])])}const L=d(c,[["render",C],["__file","decode.html.vue"]]);export{L as default};
