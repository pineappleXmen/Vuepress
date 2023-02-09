<template><div><h2 id="_1-cpu" tabindex="-1"><a class="header-anchor" href="#_1-cpu" aria-hidden="true">#</a> 1.CPU</h2>
<p><strong>CPU</strong>(Central Processing Unit) 也就是中央处理器，是计算机系统的运算和控制核心，是信息处理、程序运行的最终执行单元。</p>
<p>CPU主要由<strong>运算逻辑单元、控制单元、寄存器、以及I/O单元</strong>组成。接下来我们尝试细致了解一下各个单元的作用。</p>
<h3 id="运算逻辑单元-arithmetic-logic-unit" tabindex="-1"><a class="header-anchor" href="#运算逻辑单元-arithmetic-logic-unit" aria-hidden="true">#</a> <strong>运算逻辑单元（Arithmetic Logic Unit）</strong></h3>
<p>顾名思义，ALU主要处理运算和逻辑计算。第一个封装在单个芯片内的完整ALU是英特尔74181，在1970年发布。</p>
<p>ALU实际由两部分组成，一个是算术单元，一个是逻辑单元</p>
<p>算术单元主要做数值的计算。那么通常的四则运算在计算机中是如何实现的呢？</p>
<h4 id="加法" tabindex="-1"><a class="header-anchor" href="#加法" aria-hidden="true">#</a> <strong>加法</strong></h4>
<figure><img src="\os\image-20221007135516669.png" alt="image-20221007135516669" tabindex="0" loading="lazy"><figcaption>image-20221007135516669</figcaption></figure>
<p>在二进制中 1（1）+1（1）=10 （2）</p>
<p>可以通过XOR运算获取半加和（S）的0 通过与运算获取进位（C）1，这样就实现了1位的加法计算器，这种计算器称为Half Adder(HA)，也就是半加法器。</p>
<p>那么如果要计算多位数的加法应该如何做呢？</p>
<p>只需要将前一位的进位与该位上的两个数，这三个数共同相加即可 获取一个半加数 一个进位数</p>
<figure><img src="\os\image-20221007135814569.png" alt="image-20221007135814569" tabindex="0" loading="lazy"><figcaption>image-20221007135814569</figcaption></figure>
<p>这种计算三个数的和的加法器称为全加法器(Full Adder)</p>
<p>将半加法器和多个全加法器叠加在一起组成一个单元时，就可以构成多位的<strong>串行进位全加法器</strong>(RCA)</p>
<figure><img src="\os\image-20221007140207382.png" alt="image-20221007140207382" tabindex="0" loading="lazy"><figcaption>image-20221007140207382</figcaption></figure>
<p>如图是一个四位的加法器，可以运算4位二进制数的加法，这个加法计算器是从低位到高位一位一位的进行计算的，计算高位时需要首先拿到低位的计算结果,这样会导致计算的延迟很高。</p>
<figure><img src="\os\image-20221007140554174.png" alt="image-20221007140554174" tabindex="0" loading="lazy"><figcaption>image-20221007140554174</figcaption></figure>
<p>而并行进位全加法器就可以通过并行的方式解决RCA延迟高的问题。但是相应需要的零件就会增多。</p>
<h4 id="减法" tabindex="-1"><a class="header-anchor" href="#减法" aria-hidden="true">#</a> <strong>减法</strong></h4>
<p>减法就是在加法的基础上加上一个负数解决的。但是如何表达负数是二进制中的一个问题。</p>
<p>用二进制的第一位表示正数和负数。正数为0，负数为1。按照这个规则表示的编码即为原码。</p>
<p>例子</p>
<p>1011表示-3</p>
<p>0011表示3</p>
<p>但是，直接用原码相加的结果可以看出 1011+0011 = 1110（16）而不是0。这说明正负数是无法用原码直接相加得出结果的。</p>
<p>思考，如何让1011变为0?</p>
<p>有两种方法：第一种 0011-0011 结果即为0 也就是十进制中的3-3=0</p>
<p>第二种方法：由于计算器只能表示一定的位数，超过该位数的进位会溢出，被舍弃，所以可以通过把该数先变为该计算器表示的最大数，然后再加1，这样通过溢出的方式也使得该数字变为0。</p>
<p>例子：</p>
<p>0011+1100=1111</p>
<p>1111+0001=10000（由于该计算器只能保留4位，故最后的答案为0000，也就是0）</p>
<p>这样就相当于3+（-3） = 0</p>
<p>我们可以看出 一个数加上自己的反数（对每一位取反 0011 -&gt; 1100）再加一，就可以得到0。</p>
<p>也就是说 0011 + 1101 = 0000 ，这里的1101也就可以表达-3了。</p>
<p>这里的1101就是负数的<strong>补码</strong></p>
<p>对于正数而言，补码=原码 也就是第一种情况。</p>
<p>对于负数而言，补码=反码（每一位取反）+1，也就是第二种情况。</p>
<p>对于计算机减法而言，就是通过补码来进行计算的。</p>
<p>所以对于一个4位的计算器而言，其能表达的数字就为-2^3（-8） 到 2^3-1（7）一共16个数。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//在java中 一个int形变量是32位的 也就是说，可以表示的数为-2^31到2^31-1</span>
<span class="token comment">//打印其二进制字符串可以查看</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> max <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//int类型最大值</span>
        <span class="token class-name">String</span> min <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//最小值</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token comment">//打印的结果为补码</span>
<span class="token comment">//1111111111111111111111111111111  前导0被省略了</span>
<span class="token comment">//10000000000000000000000000000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="乘法" tabindex="-1"><a class="header-anchor" href="#乘法" aria-hidden="true">#</a> 乘法</h4>
<p>乘法本质是多个数的加法，如5*3，就可以做成为3个5相加。但是这样加的速度太慢了。</p>
<p>想要快速加法，可以使用乘法计算竖式的方法解决。</p>
<figure><img src="\os\image-20221007144915441.png" alt="image-20221007144915441" tabindex="0" loading="lazy"><figcaption>image-20221007144915441</figcaption></figure>
<p>如图是一个四位的乘法计算器，通过RCA集成错位相加，就可以像列竖式一样的方式快速求取乘法的结果了。</p>
<figure><img src="\os\image-20221007145227934.png" alt="image-20221007145227934" tabindex="0" loading="lazy"><figcaption>image-20221007145227934</figcaption></figure>
<p>也可以用CSA 如图所示执行乘法运算。</p>
<h4 id="逻辑运算" tabindex="-1"><a class="header-anchor" href="#逻辑运算" aria-hidden="true">#</a> 逻辑运算</h4>
<p>通过一系列晶体管、二极管的排列，可以执行一些判断如与、或、非门的判断。</p>
<p>ALU通过指令集的方式，确定对输入的数据进行的操作类型，并返回一些flag表达计算的结果。</p>
<h3 id="寄存器-registers" tabindex="-1"><a class="header-anchor" href="#寄存器-registers" aria-hidden="true">#</a> <strong>寄存器（Registers）</strong></h3>
<p><strong>寄存器是如何存储信息的？</strong></p>
<p>寄存器如何存0？</p>
<figure><img src="\os\image-20221007152859500.png" alt="image-20221007152859500" tabindex="0" loading="lazy"><figcaption>image-20221007152859500</figcaption></figure>
<p>通过或门回连来记录1。如果回连的输入（B）为1，那么无论A做什么改变，变为0或者1，输出都为1.这也就表示我们将1存入了这个电路中。</p>
<figure><img src="\os\image-20221007153101691.png" alt="image-20221007153101691" tabindex="0" loading="lazy"><figcaption>image-20221007153101691</figcaption></figure>
<p>同样，AND门可以用来记录0，无论A做什么改变，只要B为0，则输出一直为0。</p>
<p>将这两个电路进行合并</p>
<figure><img src="\os\image-20221007153210279.png" alt="image-20221007153210279" tabindex="0" loading="lazy"><figcaption>image-20221007153210279</figcaption></figure>
<p>可以获得一个AND-OR锁存器。</p>
<p>RESET功能，当RESET为1时，表示开启复位功能，无论SET值为多少，输出均为初始化的0</p>
<p>SET功能，当RESET为0，也就是关闭复位功能的时候，可以存储0或1，OUTPUT输出上一次SET的值。</p>
<p>这样，我们就获得了一个可以存储1位的暂存器（Memory）！</p>
<figure><img src="\os\image-20221007153632654.png" alt="image-20221007153632654" tabindex="0" loading="lazy"><figcaption>image-20221007153632654</figcaption></figure>
<p>进一步封装，我们期望在一条线进行数据的输入，一条线控制能否输入，一条线进行输出。上图就表示了门锁这一种电路的封装。通过DATA INPUT进行0和1的输入，只有当允许写入线为1时，才可以写入，允许写入线为0时，会输出上一次存储的信息。</p>
<p>一组像这样的单个寄存器组合在一起就可以构成一个多位的寄存器！一个寄存器有多少个这样的单个寄存器就称为寄存器的位宽（width）</p>
<p>但是按行排列并不是最佳的方法，一般是按矩阵的方式进行排列的，这样可以节省很多电线的开销</p>
<figure><img src="\os\image-20221007154810857.png" alt="image-20221007154810857" tabindex="0" loading="lazy"><figcaption>image-20221007154810857</figcaption></figure>
<p>通过多路复用器可以确定某个存储器的位置是在哪一行的哪一列。</p>
<p>如图共有16行*16列，16个数字可以用4位二进制（2^4=16）表示。如果要表示地址的行和列用8位数就可以进行表示了（如00000000 前4位表示第一行，后4位表示第一列）。</p>
<figure><img src="\os\image-20221007155123986.png" alt="image-20221007155123986" tabindex="0" loading="lazy"><figcaption>image-20221007155123986</figcaption></figure>
<p>这样，我们只需要8位地址线，就可以定位这个矩阵的某一行和某一列了。同时，还需要数据线读取数据，允许写入和允许读取线来控制内存。</p>
<p>此时，一个256Bit的暂存器的模型就做好了！</p>
<figure><img src="\os\image-20221007155447615.png" alt="image-20221007155447615" tabindex="0" loading="lazy"><figcaption>image-20221007155447615</figcaption></figure>
<p>如果将8个寄存器连接起来，我们就可以存储256个8bit的数据了。</p>
<p>对于一个8bit的数据，其内存的地址都是一致的（如第一行，第一列）将这8个bit分别存入8个寄存器的同一位置。在读取时，同时读取八个寄存器的同一个位置的数据，就可以获得存入的数据了。</p>
<p>这就是说 因为 1byte=8bit 这个寄存器就可以存储256byte的数据了。</p>
<p>寄存器和RAM的原理就是如此，对于RAM而言，存储是线性的，对于一个地址就会有一个存储的信息。</p>
<p>在CPU中，有很多种具有不同功能的寄存器。</p>
<p>以Intel经典的x86架构下来举例，其中的寄存器有</p>
<p><strong>8个通用寄存器：EAX、EBX、ECX、EDX、ESI、EDI、ESP、EBP</strong></p>
<p><strong>1个标志寄存器：EFLAGS</strong></p>
<p><strong>6个段寄存器：CS、DS、ES、FS、GS、SS</strong></p>
<p><strong>5个控制寄存器：CR0、CR1、CR2、CR3、CR4</strong></p>
<p><strong>8个调试寄存器：DR0、DR1、DR2、DR3、DR4、DR5、DR6、DR7</strong></p>
<p><strong>4个系统地址寄存器：GDTR、IDTR、LDTR、TR</strong></p>
<h4 id="通用寄存器" tabindex="-1"><a class="header-anchor" href="#通用寄存器" aria-hidden="true">#</a> <strong>通用寄存器</strong></h4>
<p>​	<strong>EAX</strong>:累加器(Accumulator), 它的低16位即是AX，而AX又可分为高8位AH和低8位AL。累加寄存器暂时存放ALU运算的结果信息。显然，运算器中至少要有一个<strong>累加寄存器</strong>。在运算器中，累加器是专门存放算术或逻辑运算的一个操作数和运算结果的寄存器。能进行<strong>加、减、读出、移位、循环移位和求补等操作</strong>。是运算器的主要部分。</p>
<p>​    <strong>EBX</strong>：基地址寄存器(Base Register), 它的低16位即是BX，而BX又可分为高8位BH和低8位BL。主要用于在<strong>内存寻址时存放基地址</strong>。所谓基地址就是每个段的初始地址。一个程序由<strong>数据段</strong>，<strong>代码段</strong>，<strong>堆栈段</strong>，<strong>附加段</strong>四个主要段组成。基地址其实就是每个段的起始地址，又称段地址，分别存储在四个寄存器里，DS（Data Segment），CS（Code Segment），SS（Stack Segment），ES（Extra Segment），按顺序来的。</p>
<p><strong>ECX</strong>：计数寄存器（Count Register），它的低16位即是CX，而CX又可分为高8位CH和低8位CL。在循环和字符串操作时，要用它来<strong>控制循环次数</strong>；在位操作 中，当移多位时，要用CL来指明移位的位数；是重复(REP)前缀指令和LOOP指令的内定计数器。</p>
<p><strong>EDX</strong>：数据寄存器（Data Register），它的低16位即是DX，而DX又可分为高8位DH和低8位DL。在进行乘、除运算时，它可作为默认的操作数参与运算，也可用于存放I/O的端口地址；且总是被用来放<strong>整数除法产生的余数</strong>。</p>
<p>​	<strong>ESI/EDI</strong>：分别叫做源/目标索引寄存器(Source/Destination Index Register)，它们的低16位分别是SI、DI。它们主要用于存放存储单元在段内的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。在很多字符串操作指令中, DS:ESI指向源串,而ES:EDI指向目标串。此外，它们又作为通用寄存器可以进行任意的常规的操作，如加减移位或普通的内存间接寻址。</p>
<p>​    <strong>EBP/BSP</strong>：分别是基址针寄存器（Base Pointer Register）/堆栈指针寄存器（Stack Pointer Register），低16位是BP、SP，其内存分别放着一个指针，该指针永远指向系统栈最上面一个栈帧的栈顶/底部。主要用于存放堆栈内存储单元的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。指针寄存器不可分割成8位寄存器。作为通用寄存器，也可存储算术逻辑运算的操作数和运算结果。并且规定：BP为基指针(Base Pointer)寄存器，用它可直接存取堆栈中的数据；SP为堆栈指针(Stack Pointer)寄存器，用它只可访问栈顶。在32位平台上，ESP每次减少4字节。EBP最经常被用作高级语言函数调用的&quot;框架指针&quot;（frame pointer）,EBP 构成了函数的一个框架，在C++反汇编中EBP通常是局部变量、传进来的参数。这里要注意在intel系统中栈是向下生长的(栈越扩大其值越小,堆恰好相反)。在通常情况下ESP是可变的,随着栈的生长而逐渐变小,而ESB寄存器是固定的,只有当函数的调用后,发生入栈操作而改变，在函数执行结束之后需要还原。</p>
<h4 id="状态寄存器" tabindex="-1"><a class="header-anchor" href="#状态寄存器" aria-hidden="true">#</a> 状态寄存器</h4>
<p><strong>EFLAGS</strong>：主要用于提供程序的状态及进行相应的控制。32位的EFLAGS寄存器包含一组状态标志、系统标志以及一个控制标志。在x86处理器初始化之后，EFLAGS寄存器的状态值为0000 0002H。第1、3、5、15以及22到31位均被保留，这个寄存器中的有些标志通过使用特殊的通用指令可以直接被修改，但并没有指令能够检查或者修改整个寄存器。通过使用LAHF/SAHF/PUSHF/POPF/POPFD等指令，可以将EFLAGS寄存器的标志位成组移到程序栈或EAX寄存器，或者从这些设施中将操作后的结果保存到EFLAGS寄存器中。在EFLAGS寄存器的内容被传送到栈或是EAX寄存器后，可以通过位操作指令(BT,BTS, BTR, BTC)检查或修改这些标志位。当调用中断或异常处理程序时，处理器将在程序栈上自动保存EFLAGS的状态值。若在中断或异常处理时发生任务切换，那么EFLAGS寄存器的状态将被保存在TSS中，注意是将要被挂起的本次任务的状态。</p>
<h4 id="段寄存器" tabindex="-1"><a class="header-anchor" href="#段寄存器" aria-hidden="true">#</a> 段寄存器</h4>
<p><strong>CS</strong>：CS段寄存器包含代码段的段选择符，代码段保存正在执行的指令。处理器从代码段读取指令时，使用有CS寄存器中的段选择符与EIP寄存器联合构成的逻辑地址。EIP保存要执行的下一条指令在代码段中的偏移量。CS寄存器不能有应用程序显式地的加载。相反，可以通过某些指令或处理器内部操作隐式地加载。这些指令/内部操作，例如过程调用，中断处理，或者任务切换，用于改变程序的执行流，从而导致更新CS寄存器。</p>
<p><strong>DS/ES/FS/GS</strong>：这四个寄存器指向四个数据段。多个数据段的存在允许高效地且安全地访问不同的数据结构类型。例如，可以创建如下的四个数据段：第一个数据段保存当前程序模块的数据结构，第二个数据段保存更高级别程序模块导出的数据，第三个数据段保存动态创建的数据结构，最后一个数据段保存另一个程序共享出来的数据。要想访问更多的数据段，应用程序必须按需将数据段对应的段选择符加载到DS/ES/FS/GS寄存器中的其中一个当中。</p>
<p><strong>SS</strong>：SS寄存器包含栈段的段选择符，这里栈段用于存储程序/任务/当前正在执行的处理器程序的栈帧。所有的栈操作都使用SS栈段寄存器来定位栈段。与CS代码段寄存器不同，SS寄存器可以显式地加载，这样就允许应用程序建立多个栈段，并在这些段间切换。</p>
<h4 id="控制寄存器" tabindex="-1"><a class="header-anchor" href="#控制寄存器" aria-hidden="true">#</a> <strong>控制寄存器</strong></h4>
<p>X86提供了控制寄存器，来决定CPU的操作模式和当前执行的任务的属性。有4个控制寄存器：CR0、CR1、CR2、CR3；均为32位，用于控制和确定处理器的操作模式以及当前执行任务的特性，保存全局性和任务无关的机器状态。这几个寄存器是与分页机制密切相关的，因此，在进程管理及虚拟内存管理中会涉及到这几个寄存器。对控制寄存器的读写是通过mov指令来实现。</p>
<h4 id="调试寄存器" tabindex="-1"><a class="header-anchor" href="#调试寄存器" aria-hidden="true">#</a> <strong>调试寄存器</strong></h4>
<p>​    调试寄存器主要作用是调试应用代码、系统代码、开发多任务操作系统.来监视代码的运行和处理器的性能。</p>
<h4 id="系统地址寄存器" tabindex="-1"><a class="header-anchor" href="#系统地址寄存器" aria-hidden="true">#</a> <strong>系统地址寄存器</strong></h4>
<p>​    全局描述符表GDT、局部描述符表LDT和中断描述符表IDT等都是保护方式下非常重要的特殊段，它们包含有为段机制所用的重要表格。为了方便快速地定位这些段，处理器采用一些特殊的寄存器保存这些段的基地址和段界限。我们把这些特殊的寄存器称为系统地址寄存器。</p>
<h4 id="其他寄存器" tabindex="-1"><a class="header-anchor" href="#其他寄存器" aria-hidden="true">#</a> 其他寄存器</h4>
<p>​	<strong>EIP</strong>：主要用于存放当前代码段即将被执行的下一条指令的偏移，但其本质上并不能直接被指令直接访问。这个寄存器指令由控制转移指令、中断及异常所控制。读操作通过执行call指令并取得栈中所存放的地址来实现，而写操作则通过修改程序栈中的返回指令指针并执行RET/IRET指令来完成，因此尽管这个寄存器相当重要，但其实并不是操作系统在实现过程中所需关注的焦点。</p>
<p>​    <strong>TSC</strong>：（时间戳寄存器）每个时钟周期时其值加1，重启时清零。通过RDTSC指令读取TSC寄存器，只有当CR4寄存器的TSD位为0时，才可以在任何优先级下执行该指令，否则只能在特权级下执行该指令。</p>
<p>​    **浮点寄存器：**由于在80486微处理器内部设有浮点运算器，因此在其内部有相应的寄存器，其中包括8个80位通用数据寄存器、1个48位指令指针寄存器、1个48位数据指针寄存器、1个16位控制字寄存器、1个16位状态字寄存器和1个16位标记字寄存器。</p>
<h3 id="控制单元" tabindex="-1"><a class="header-anchor" href="#控制单元" aria-hidden="true">#</a> <strong>控制单元</strong></h3>
<p>控制单元是一个统一的指挥中心，它可以获得下一条指令，解析命令，随后按照编码表的规定执行这条指令。</p>
<p>指令会指导运算单元取出数据单元中的某几个数据，计算出结果，然后放在寄存器，或是加载进内存。</p>
<h3 id="cpu运行流程" tabindex="-1"><a class="header-anchor" href="#cpu运行流程" aria-hidden="true">#</a> <strong>CPU运行流程</strong></h3>
<p>CPU运行具体的一条指令大概过程可以分为三步：</p>
<p><strong>从内存取到机器码-&gt;解析机器码-&gt;运行该机器码</strong></p>
<p>在一个时钟周期里，CPU重复做这几个流程。</p>
<figure><img src="\os\image-20221007173205931.png" alt="image-20221007173205931" tabindex="0" loading="lazy"><figcaption>image-20221007173205931</figcaption></figure>
<p>CS:IP 确定一个指令在内存的具体位置，通过控制单元从RAM中拿到数据指令，存入指令寄存器，控制单元对指令寄存器的指令进行解析，随后执行该指令。</p>
<figure><img src="\os\image-20221007190537292.png" alt="image-20221007190537292" tabindex="0" loading="lazy"><figcaption>image-20221007190537292</figcaption></figure>
<ul>
<li>第一步，CPU 读取「<strong>程序计数器</strong>」的值，这个值是指令的内存地址，然后 CPU 的「<strong>控制单元</strong>」操作「<strong>地址总线</strong>」指定需要访问的内存地址，接着通知内存设备准备数据，数据准备好后通过「<strong>数据总线</strong>」将指令数据传给 CPU，CPU 收到内存传来的数据后，将这个指令数据存入到「<strong>指令寄存器</strong>」。</li>
<li>第二步，CPU 分析「<strong>指令寄存器</strong>」中的指令，确定指令的类型和参数，如果是计算类型的指令，就把指令交给「<strong>逻辑运算单元</strong>」运算；如果是存储类型的指令，则交由「<strong>控制单元</strong>」执行；</li>
<li>第三步，CPU 执行完指令后，「<strong>程序计数器</strong>」的值自增，表示指向下一条指令。这个自增的大小，由 CPU 的位宽决定，比如 32 位的 CPU，指令是 4 个字节，需要 4 个内存地址存放，因此「<strong>程序计数器</strong>」的值会自增 4；</li>
</ul>
<h4 id="cpu如何寻址" tabindex="-1"><a class="header-anchor" href="#cpu如何寻址" aria-hidden="true">#</a> CPU如何寻址</h4>
<p><strong>寄存器方式</strong>：操作数是处理器寄存器中的内容，直接给出寄存器名称即可。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Move #200 R0 //表示把200数值存入寄存器R0中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>直接方式</strong>：直接给出操作数在内存中的地址</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Integer a //Java代码写入时会为变量分配内存地址 通过该内存地址获取该变量值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>立即方式</strong>：操作数在指令中给出</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Move #200 R0  //  #表示200是一个立即操作数 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>间接方式</strong>：在指令中给出存有操作数的内存单元地址，从该地址中读取操作数进行操作，效果类似一个指针</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Add (R1),R0  //指令读取R1的内容B 将B加上R0存入R0  通过括号表示是一个间接寻址

//寄存器R1
R1 ==> B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Add (A),R0 将A中的地址读出，拿到B的地址后再拿到操作数 将其加入R0

A==>B
B==>操作数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>变址方式</strong>：有效地址是寄存器内容加上一个常数组成的</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Add 20(R1),R2 //将内存地址为1020的操作数加上R2，存入R2
R1===>1000

//或
Add 1000(R1),R2
R1===>20
//同样的效果
//X(Ri)表示基地址+偏移量，都可以由寄存器的值给出 但最终结果为两数的和
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>相对寻址</strong>：程序计数器替代寄存器提供变址方式中的偏移量</p>
<p><strong>自动递增递减方式</strong>：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>(Ri)+ //表示访问完该操作数后会递增1
-(Ri) //递减1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="指令集" tabindex="-1"><a class="header-anchor" href="#指令集" aria-hidden="true">#</a> 指令集</h4>
<p>是由芯片开发商指定的命令集，一个数字对应一个命令。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>如
Move A,B //将A的值写入B
Add A,B //将A的值加B 写入B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="i-o操作" tabindex="-1"><a class="header-anchor" href="#i-o操作" aria-hidden="true">#</a> I/O操作</h4>
<p>通过存储器映射IO方式，将指令传送给IO设备，将IO设备缓冲寄存器的值读入AL寄存器中</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>IN REG,DX
OUT DX,REG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过地址总线传送地址信息</p>
<p>通过控制总线传输控制单元的命令</p>
<p>通过数据总线传输具体的数据</p>
<h3 id="输入、输出设备" tabindex="-1"><a class="header-anchor" href="#输入、输出设备" aria-hidden="true">#</a> <strong>输入、输出设备</strong></h3>
<p>输入设备向计算机输入数据，计算机经过计算后，把数据输出给输出设备。期间，如果输入设备是键盘，按下按键时是需要和 CPU 进行交互的，这时就需要用到控制总线了。</p>
<h3 id="线路位宽与-cpu-位宽" tabindex="-1"><a class="header-anchor" href="#线路位宽与-cpu-位宽" aria-hidden="true">#</a> <strong>线路位宽与 CPU 位宽</strong></h3>
<p>数据是如何通过线路传输的呢？其实是通过操作电压，低电压表示 0，高压电压则表示 1。</p>
<p>如果构造了高低高这样的信号，其实就是 101 二进制数据，十进制则表示 5，如果只有一条线路，就意味着每次只能传递 1 bit 的数据，即 0 或 1，那么传输 101 这个数据，就需要 3 次才能传输完成，这样的效率非常低。</p>
<p>这样一位一位传输的方式，称为串行，下一个 bit 必须等待上一个 bit 传输完成才能进行传输。当然，想一次多传一些数据，增加线路即可，这时数据就可以并行传输。</p>
<p>为了避免低效率的串行传输的方式，线路的位宽最好一次就能访问到所有的内存地址。</p>
<p>CPU 要想操作的内存地址就需要地址总线：</p>
<ul>
<li>如果地址总线只有 1 条，那每次只能表示 「0 或 1」这两种地址，所以 CPU 能操作的内存地址最大数量为 2（2^1）个（注意，不要理解成同时能操作 2 个内存地址）；</li>
<li>如果地址总线有 2 条，那么能表示 00、01、10、11 这四种地址，所以 CPU 能操作的内存地址最大数量为 4（2^2）个。</li>
</ul>
<p>那么，想要 CPU 操作 4G 大的内存，那么就需要 32 条地址总线，因为 <code v-pre>2 ^ 32 = 4G</code>。</p>
<p>知道了线路位宽的意义后，我们再来看看 CPU 位宽。</p>
<p>CPU 的位宽最好不要小于线路位宽，比如 32 位 CPU 控制 40 位宽的地址总线和数据总线的话，工作起来就会非常复杂且麻烦，所以 32 位的 CPU 最好和 32 位宽的线路搭配，因为 32 位 CPU 一次最多只能操作 32 位宽的地址总线和数据总线。</p>
<p>如果用 32 位 CPU 去加和两个 64 位大小的数字，就需要把这 2 个 64 位的数字分成 2 个低位 32 位数字和 2 个高位 32 位数字来计算，先加个两个低位的 32 位数字，算出进位，然后加和两个高位的 32 位数字，最后再加上进位，就能算出结果了，可以发现 32 位 CPU 并不能一次性计算出加和两个 64 位数字的结果。</p>
<p>对于 64 位 CPU 就可以一次性算出加和两个 64 位数字的结果，因为 64 位 CPU 可以一次读入 64 位的数字，并且 64 位 CPU 内部的逻辑运算单元也支持 64 位数字的计算。</p>
<p>但是并不代表 64 位 CPU 性能比 32 位 CPU 高很多，很少应用需要算超过 32 位的数字，所以<strong>如果计算的数额不超过 32 位数字的情况下，32 位和 64 位 CPU 之间没什么区别的，只有当计算超过 32 位数字的情况下，64 位的优势才能体现出来</strong>。</p>
<p>另外，32 位 CPU 最大只能操作 4GB 内存，就算你装了 8 GB 内存条，也没用。而 64 位 CPU 寻址范围则很大，理论最大的寻址空间为 <code v-pre>2^64</code>。</p>
<h3 id="cpu缓存一致性" tabindex="-1"><a class="header-anchor" href="#cpu缓存一致性" aria-hidden="true">#</a> <strong>CPU缓存一致性</strong></h3>
<h4 id="cpu-cache-的数据写入" tabindex="-1"><a class="header-anchor" href="#cpu-cache-的数据写入" aria-hidden="true">#</a> CPU Cache 的数据写入</h4>
<p>随着时间的推移，CPU 和内存的访问性能相差越来越大，于是就在 CPU 内部嵌入了 CPU Cache（高速缓存），CPU Cache 离 CPU 核心相当近，因此它的访问速度是很快的，于是它充当了 CPU 与内存之间的缓存角色。</p>
<p>CPU Cache 通常分为三级缓存：L1 Cache、L2 Cache、L3 Cache，级别越低的离 CPU 核心越近，访问速度也快，但是存储容量相对就会越小。其中，在多核心的 CPU 里，每个核心都有各自的 L1/L2 Cache，而 L3 Cache 是所有核心共享使用的。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost2/操作系统/存储结构/CPU-Cache.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>我们先简单了解下 CPU Cache 的结构，CPU Cache 是由很多个 Cache Line 组成的，CPU Line 是 CPU 从内存读取数据的基本单位，而 CPU Line 是由各种标志（Tag）+ 数据块（Data Block）组成，你可以在下图清晰的看到：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/Cache的数据结构.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>事实上，数据不光是只有读操作，还有写操作，那么如果数据写入 Cache 之后，内存与 Cache 相对应的数据将会不同，这种情况下 Cache 和内存数据都不一致了，于是我们肯定是要把 Cache 中的数据同步到内存里的。</p>
<p>问题来了，那在什么时机才把 Cache 中的数据写回到内存呢？为了应对这个问题，下面介绍两种针对写入数据的方法：</p>
<ul>
<li>写直达（<em>Write Through</em>）</li>
<li>写回（<em>Write Back</em>）</li>
</ul>
<h4 id="写直达" tabindex="-1"><a class="header-anchor" href="#写直达" aria-hidden="true">#</a> 写直达</h4>
<p>保持内存与 Cache 一致性最简单的方式是，<strong>把数据同时写入内存和 Cache 中</strong>，这种方法称为<strong>写直达（*Write Through*）</strong>。</p>
<p>在这个方法里，写入前会先判断数据是否已经在 CPU Cache 里面了：</p>
<ul>
<li>如果数据已经在 Cache 里面，先将数据更新到 Cache 里面，再写入到内存里面；</li>
<li>如果数据没有在 Cache 里面，就直接把数据更新到内存里面。</li>
</ul>
<p>写直达法很直观，也很简单，但是问题明显，无论数据在不在 Cache 里面，每次写操作都会写回到内存，这样写操作将会花费大量的时间，无疑性能会受到很大的影响。</p>
<h4 id="写回" tabindex="-1"><a class="header-anchor" href="#写回" aria-hidden="true">#</a> 写回</h4>
<p>既然写直达由于每次写操作都会把数据写回到内存，而导致影响性能，于是为了要减少数据写回内存的频率，就出现了<strong>写回（*Write Back*）的方法</strong>。</p>
<p>在写回机制中，<strong>当发生写操作时，新的数据仅仅被写入 Cache Block 里，只有当修改过的 Cache Block「被替换」时才需要写到内存中</strong>，减少了数据写回内存的频率，这样便可以提高系统的性能。</p>
<p>那具体如何做到的呢？下面来详细说一下：</p>
<ul>
<li>如果当发生写操作时，数据已经在 CPU Cache 里的话，则把数据更新到 CPU Cache 里，同时标记 CPU Cache 里的这个 Cache Block 为脏（Dirty）的，这个脏的标记代表这个时候，我们 CPU Cache 里面的这个 Cache Block 的数据和内存是不一致的，这种情况是不用把数据写到内存里的；</li>
<li>如果当发生写操作时，数据所对应的 Cache Block 里存放的是「别的内存地址的数据」的话，就要检查这个 Cache Block 里的数据有没有被标记为脏的：
<ul>
<li>如果是脏的话，我们就要把这个 Cache Block 里的数据写回到内存，然后再把当前要写入的数据，先从内存读入到 Cache Block 里（注意，这一步不是没用的，具体为什么要这一步，可以看这个「<a href="https://stackoverflow.com/questions/26672661/for-write-back-cache-policy-why-data-should-first-be-read-from-memory-before-w" target="_blank" rel="noopener noreferrer">回答 (opens new window)<ExternalLinkIcon/></a>」），然后再把当前要写入的数据写入到 Cache Block，最后也把它标记为脏的；</li>
<li>如果 Cache Block 里面的数据没有被标记为脏，则就直接将数据写入到这个 Cache Block 里，然后再把这个 Cache Block 标记为脏的就好了。</li>
</ul>
</li>
</ul>
<p>可以发现写回这个方法，在把数据写入到 Cache 的时候，只有在缓存不命中，同时数据对应的 Cache 中的 Cache Block 为脏标记的情况下，才会将数据写到内存中，而在缓存命中的情况下，则在写入后 Cache 后，只需把该数据对应的 Cache Block 标记为脏即可，而不用写到内存里。</p>
<p>这样的好处是，如果我们大量的操作都能够命中缓存，那么大部分时间里 CPU 都不需要读写内存，自然性能相比写直达会高很多。</p>
<p>为什么缓存没命中时，还要定位 cache block？这是因为此时是要判断数据即将写入到 cache block 里的位置，是否被「其他数据」占用了此位置，如果这个「其他数据」是脏数据，那么就要帮忙把它写回到内存。</p>
<hr>
<h4 id="缓存一致性问题" tabindex="-1"><a class="header-anchor" href="#缓存一致性问题" aria-hidden="true">#</a> 缓存一致性问题</h4>
<p>现在 CPU 都是多核的，由于 L1/L2 Cache 是多个核心各自独有的，那么会带来多核心的<strong>缓存一致性（*Cache Coherence*）</strong> 的问题，如果不能保证缓存一致性的问题，就可能造成结果错误。</p>
<p>那缓存一致性的问题具体是怎么发生的呢？我们以一个含有两个核心的 CPU 作为例子看一看。</p>
<p>假设 A 号核心和 B 号核心同时运行两个线程，都操作共同的变量 i（初始值为 0 ）。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/缓存一致性问题例子.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>这时如果 A 号核心执行了 <code v-pre>i++</code> 语句的时候，为了考虑性能，使用了我们前面所说的写回策略，先把值为 <code v-pre>1</code> 的执行结果写入到 L1/L2 Cache 中，然后把 L1/L2 Cache 中对应的 Block 标记为脏的，这个时候数据其实没有被同步到内存中的，因为写回策略，只有在 A 号核心中的这个 Cache Block 要被替换的时候，数据才会写入到内存里。</p>
<p>如果这时旁边的 B 号核心尝试从内存读取 i 变量的值，则读到的将会是错误的值，因为刚才 A 号核心更新 i 值还没写入到内存中，内存中的值还依然是 0。<strong>这个就是所谓的缓存一致性问题，A 号核心和 B 号核心的缓存，在这个时候是不一致，从而会导致执行结果的错误。</strong></p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/缓存一致性问题例子2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>那么，要解决这一问题，就需要一种机制，来同步两个不同核心里面的缓存数据。要实现的这个机制的话，要保证做到下面这 2 点：</p>
<ul>
<li>第一点，某个 CPU 核心里的 Cache 数据更新时，必须要传播到其他核心的 Cache，这个称为<strong>写传播（*Write Propagation*）</strong>；</li>
<li>第二点，某个 CPU 核心里对数据的操作顺序，必须在其他核心看起来顺序是一样的，这个称为<strong>事务的串行化（*Transaction Serialization*）</strong>。</li>
</ul>
<p>第一点写传播很容易就理解，当某个核心在 Cache 更新了数据，就需要同步到其他核心的 Cache 里。而对于第二点事务的串行化，我们举个例子来理解它。</p>
<p>假设我们有一个含有 4 个核心的 CPU，这 4 个核心都操作共同的变量 i（初始值为 0 ）。A 号核心先把 i 值变为 100，而此时同一时间，B 号核心先把 i 值变为 200，这里两个修改，都会「传播」到 C 和 D 号核心。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/事件顺序问题.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>那么问题就来了，C 号核心先收到了 A 号核心更新数据的事件，再收到 B 号核心更新数据的事件，因此 C 号核心看到的变量 i 是先变成 100，后变成 200。</p>
<p>而如果 D 号核心收到的事件是反过来的，则 D 号核心看到的是变量 i 先变成 200，再变成 100，虽然是做到了写传播，但是各个 Cache 里面的数据还是不一致的。</p>
<p>所以，我们要保证 C 号核心和 D 号核心都能看到<strong>相同顺序的数据变化</strong>，比如变量 i 都是先变成 100，再变成 200，这样的过程就是事务的串行化。</p>
<p>要实现事务串行化，要做到 2 点：</p>
<ul>
<li>CPU 核心对于 Cache 中数据的操作，需要同步给其他 CPU 核心；</li>
<li>要引入「锁」的概念，如果两个 CPU 核心里有相同数据的 Cache，那么对于这个 Cache 数据的更新，只有拿到了「锁」，才能进行对应的数据更新。</li>
</ul>
<p>那接下来我们看看，写传播和事务串行化具体是用什么技术实现的。</p>
<hr>
<h4 id="总线嗅探" tabindex="-1"><a class="header-anchor" href="#总线嗅探" aria-hidden="true">#</a> 总线嗅探</h4>
<p>写传播的原则就是当某个 CPU 核心更新了 Cache 中的数据，要把该事件广播通知到其他核心。最常见实现的方式是<strong>总线嗅探（*Bus Snooping*）</strong>。</p>
<p>我还是以前面的 i 变量例子来说明总线嗅探的工作机制，当 A 号 CPU 核心修改了 L1 Cache 中 i 变量的值，通过总线把这个事件广播通知给其他所有的核心，然后每个 CPU 核心都会监听总线上的广播事件，并检查是否有相同的数据在自己的 L1 Cache 里面，如果 B 号 CPU 核心的 L1 Cache 中有该数据，那么也需要把该数据更新到自己的 L1 Cache。</p>
<p>可以发现，总线嗅探方法很简单， CPU 需要每时每刻监听总线上的一切活动，但是不管别的核心的 Cache 是否缓存相同的数据，都需要发出一个广播事件，这无疑会加重总线的负载。</p>
<p>另外，总线嗅探只是保证了某个 CPU 核心的 Cache 更新数据这个事件能被其他 CPU 核心知道，但是并不能保证事务串行化。</p>
<p>于是，有一个协议基于总线嗅探机制实现了事务串行化，也用状态机机制降低了总线带宽压力，这个协议就是 MESI 协议，这个协议就做到了 CPU 缓存一致性。</p>
<hr>
<h4 id="mesi-协议" tabindex="-1"><a class="header-anchor" href="#mesi-协议" aria-hidden="true">#</a> MESI 协议</h4>
<p>MESI 协议其实是 4 个状态单词的开头字母缩写，分别是：</p>
<ul>
<li><em>Modified</em>，已修改</li>
<li><em>Exclusive</em>，独占</li>
<li><em>Shared</em>，共享</li>
<li><em>Invalidated</em>，已失效</li>
</ul>
<p>这四个状态来标记 Cache Line 四个不同的状态。</p>
<p>「已修改M」状态就是我们前面提到的脏标记，代表该 Cache Block 上的数据已经被更新过，但是还没有写到内存里。而「已失效」状态，表示的是这个 Cache Block 里的数据已经失效了，不可以读取该状态的数据。</p>
<p>「独占E」和「共享S」状态都代表 Cache Block 里的数据是干净的，也就是说，这个时候 Cache Block 里的数据和内存里面的数据是一致性的。</p>
<p>「独占E」和「共享S」的差别在于，独占状态的时候，数据只存储在一个 CPU 核心的 Cache 里，而其他 CPU 核心的 Cache 没有该数据。这个时候，如果要向独占的 Cache 写数据，就可以直接自由地写入，而不需要通知其他 CPU 核心，因为只有你这有这个数据，就不存在缓存一致性的问题了，于是就可以随便操作该数据。</p>
<p>另外，在「独占E」状态下的数据，如果有其他核心从内存读取了相同的数据到各自的 Cache ，那么这个时候，独占状态下的数据就会变成共享状态。</p>
<p>那么，「共享」状态代表着相同的数据在多个 CPU 核心的 Cache 里都有，所以当我们要更新 Cache 里面的数据的时候，不能直接修改，而是要先向所有的其他 CPU 核心广播一个请求，要求先把其他核心的 Cache 中对应的 Cache Line 标记为「无效I」状态，然后再更新当前 Cache 里面的数据。</p>
<p>我们举个具体的例子来看看这四个状态的转换：</p>
<ol>
<li>当 A 号 CPU 核心从内存读取变量 i 的值，数据被缓存在 A 号 CPU 核心自己的 Cache 里面，此时其他 CPU 核心的 Cache 没有缓存该数据，于是标记 Cache Line 状态为「独占」，此时其 Cache 中的数据与内存是一致的；</li>
<li>然后 B 号 CPU 核心也从内存读取了变量 i 的值，此时会发送消息给其他 CPU 核心，由于 A 号 CPU 核心已经缓存了该数据，所以会把数据返回给 B 号 CPU 核心。在这个时候， A 和 B 核心缓存了相同的数据，Cache Line 的状态就会变成「共享」，并且其 Cache 中的数据与内存也是一致的；</li>
<li>当 A 号 CPU 核心要修改 Cache 中 i 变量的值，发现数据对应的 Cache Line 的状态是共享状态，则要向所有的其他 CPU 核心广播一个请求，要求先把其他核心的 Cache 中对应的 Cache Line 标记为「无效」状态，然后 A 号 CPU 核心才更新 Cache 里面的数据，同时标记 Cache Line 为「已修改」状态，此时 Cache 中的数据就与内存不一致了。</li>
<li>如果 A 号 CPU 核心「继续」修改 Cache 中 i 变量的值，由于此时的 Cache Line 是「已修改」状态，因此不需要给其他 CPU 核心发送消息，直接更新数据即可。</li>
<li>如果 A 号 CPU 核心的 Cache 里的 i 变量对应的 Cache Line 要被「替换」，发现 Cache Line 状态是「已修改」状态，就会在替换前先把数据同步到内存。</li>
</ol>
<p>所以，可以发现当 Cache Line 状态是「已修改」或者「独占」状态时，修改更新其数据不需要发送广播给其他 CPU 核心，这在一定程度上减少了总线带宽压力。</p>
<p>事实上，整个 MESI 的状态可以用一个有限状态机来表示它的状态流转。还有一点，对于不同状态触发的事件操作，可能是来自本地 CPU 核心发出的广播事件，也可以是来自其他 CPU 核心通过总线发出的广播事件。下图即是 MESI 协议的状态图：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/MESI协议.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>MESI 协议的四种状态之间的流转过程，我汇总成了下面的表格，你可以更详细的看到每个状态转换的原因：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/CPU缓存一致性/ MESI状态转换表格.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<hr>
<p>CPU 在读写数据的时候，都是在 CPU Cache 读写数据的，原因是 Cache 离 CPU 很近，读写性能相比内存高出很多。对于 Cache 里没有缓存 CPU 所需要读取的数据的这种情况，CPU 则会从内存读取数据，并将数据缓存到 Cache 里面，最后 CPU 再从 Cache 读取数据。</p>
<p>而对于数据的写入，CPU 都会先写入到 Cache 里面，然后再在找个合适的时机写入到内存，那就有「写直达」和「写回」这两种策略来保证 Cache 与内存的数据一致性：</p>
<ul>
<li>写直达，只要有数据写入，都会直接把数据写入到内存里面，这种方式简单直观，但是性能就会受限于内存的访问速度；</li>
<li>写回，对于已经缓存在 Cache 的数据的写入，只需要更新其数据就可以，不用写入到内存，只有在需要把缓存里面的脏数据交换出去的时候，才把数据同步到内存里，这种方式在缓存命中率高的情况，性能会更好；</li>
</ul>
<p>当今 CPU 都是多核的，每个核心都有各自独立的 L1/L2 Cache，只有 L3 Cache 是多个核心之间共享的。所以，我们要确保多核缓存是一致性的，否则会出现错误的结果。</p>
<p>要想实现缓存一致性，关键是要满足 2 点：</p>
<ul>
<li>第一点是写传播，也就是当某个 CPU 核心发生写入操作时，需要把该事件广播通知给其他核心；</li>
<li>第二点是事物的串行化，这个很重要，只有保证了这个，才能保障我们的数据是真正一致的，我们的程序在各个不同的核心上运行的结果也是一致的；</li>
</ul>
<p>基于总线嗅探机制的 MESI 协议，就满足上面了这两点，因此它是保障缓存一致性的协议。</p>
<p>MESI 协议，是已修改、独占、共享、已失效这四个状态的英文缩写的组合。整个 MSI 状态的变更，则是根据来自本地 CPU 核心的请求，或者来自其他 CPU 核心通过总线传输过来的请求，从而构成一个流动的状态机。另外，对于在「已修改」或者「独占」状态的 Cache Line，修改更新其数据不需要发送广播给其他 CPU 核心。</p>
<h3 id="软中断" tabindex="-1"><a class="header-anchor" href="#软中断" aria-hidden="true">#</a> 软中断</h3>
<h3 id="中断是什么" tabindex="-1"><a class="header-anchor" href="#中断是什么" aria-hidden="true">#</a> 中断是什么？</h3>
<p>先来看看什么是中断？在计算机中，中断是系统用来响应硬件设备请求的一种机制，操作系统收到硬件的中断请求，会打断正在执行的进程，然后调用内核中的中断处理程序来响应请求。</p>
<p>中断是一种异步的事件处理机制，可以提高系统的并发处理能力。</p>
<p>操作系统收到了中断请求，会打断其他进程的运行，所以<strong>中断请求的响应程序，也就是中断处理程序，要尽可能快的执行完，这样可以减少对正常进程运行调度地影响。</strong></p>
<p>而且，中断处理程序在响应中断时，可能还会「临时关闭中断」，这意味着，如果当前中断处理程序没有执行完之前，系统中其他的中断请求都无法被响应，也就说中断有可能会丢失，所以中断处理程序要短且快。</p>
<hr>
<h3 id="什么是软中断" tabindex="-1"><a class="header-anchor" href="#什么是软中断" aria-hidden="true">#</a> 什么是软中断？</h3>
<p>前面我们也提到了，中断请求的处理程序应该要短且快，这样才能减少对正常进程运行调度地影响，而且中断处理程序可能会暂时关闭中断，这时如果中断处理程序执行时间过长，可能在还未执行完中断处理程序前，会丢失当前其他设备的中断请求。</p>
<p>那 Linux 系统<strong>为了解决中断处理程序执行过长和中断丢失的问题，将中断过程分成了两个阶段，分别是「上半部和下半部分」</strong>。</p>
<ul>
<li><strong>上半部用来快速处理中断</strong>，一般会暂时关闭中断请求，主要负责处理跟硬件紧密相关或者时间敏感的事情。</li>
<li><strong>下半部用来延迟处理上半部未完成的工作</strong>，一般以「内核线程」的方式运行。</li>
</ul>
<p>这样，第一位配送员就不会占用我手机太多时间，当第二位配送员正好过来时，会有很大几率拨通我的电话。</p>
<p>再举一个计算机中的例子，常见的网卡接收网络包的例子。</p>
<p>网卡收到网络包后，会通过<strong>硬件中断</strong>通知内核有新的数据到了，于是内核就会调用对应的中断处理程序来响应该事件，这个事件的处理也是会分成上半部和下半部。</p>
<p>上部分要做到快速处理，所以只要把网卡的数据读到内存中，然后更新一下硬件寄存器的状态，比如把状态更新为表示数据已经读到内存中的状态值。</p>
<p>接着，内核会触发一个<strong>软中断</strong>，把一些处理比较耗时且复杂的事情，交给「软中断处理程序」去做，也就是中断的下半部，其主要是需要从内存中找到网络数据，再按照网络协议栈，对网络数据进行逐层解析和处理，最后把数据送给应用程序。</p>
<p>所以，中断处理程序的上部分和下半部可以理解为：</p>
<ul>
<li><strong>上半部直接处理硬件请求，也就是硬中断</strong>，主要是负责耗时短的工作，特点是快速执行；</li>
<li><strong>下半部是由内核触发，也就说软中断</strong>，主要是负责上半部未完成的工作，通常都是耗时比较长的事情，特点是延迟执行；</li>
</ul>
<p>还有一个区别，硬中断（上半部）是会打断 CPU 正在执行的任务，然后立即执行中断处理程序，而软中断（下半部）是以内核线程的方式执行，并且每一个 CPU 都对应一个软中断内核线程，名字通常为「ksoftirqd/CPU 编号」，比如 0 号 CPU 对应的软中断内核线程的名字是 <code v-pre>ksoftirqd/0</code></p>
<p>不过，软中断不只是包括硬件设备中断处理程序的下半部，一些内核自定义事件也属于软中断，比如内核调度等、RCU 锁（内核里常用的一种锁）等。</p>
<hr>
<h3 id="系统里有哪些软中断" tabindex="-1"><a class="header-anchor" href="#系统里有哪些软中断" aria-hidden="true">#</a> 系统里有哪些软中断？</h3>
<p>在 Linux 系统里，我们可以通过查看 <code v-pre>/proc/softirqs</code> 的 内容来知晓「软中断」的运行情况，以及 <code v-pre>/proc/interrupts</code> 的 内容来知晓「硬中断」的运行情况。</p>
<p>接下来，就来简单的解析下 <code v-pre>/proc/softirqs</code> 文件的内容，在我服务器上查看到的文件内容如下：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/软中断/softirqs.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>你可以看到，每一个 CPU 都有自己对应的不同类型软中断的<strong>累计运行次数</strong>，有 3 点需要注意下。</p>
<p>第一点，要注意第一列的内容，它是代表着软中断的类型，在我的系统里，软中断包括了 10 个类型，分别对应不同的工作类型，比如 <code v-pre>NET_RX</code> 表示网络接收中断，<code v-pre>NET_TX</code> 表示网络发送中断、<code v-pre>TIMER</code> 表示定时中断、<code v-pre>RCU</code> 表示 RCU 锁中断、<code v-pre>SCHED</code> 表示内核调度中断。</p>
<p>第二点，要注意同一种类型的软中断在不同 CPU 的分布情况，正常情况下，同一种中断在不同 CPU 上的累计次数相差不多，比如我的系统里，<code v-pre>NET_RX</code> 在 CPU0 、CPU1、CPU2、CPU3 上的中断次数基本是同一个数量级，相差不多。</p>
<p>第三点，这些数值是系统运行以来的累计中断次数，数值的大小没什么参考意义，但是系统的<strong>中断次数的变化速率</strong>才是我们要关注的，我们可以使用 <code v-pre>watch -d cat /proc/softirqs</code> 命令查看中断次数的变化速率。</p>
<p>前面提到过，软中断是以内核线程的方式执行的，我们可以用 <code v-pre>ps</code> 命令可以查看到，下面这个就是在我的服务器上查到软中断内核线程的结果：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/软中断/ksoftirqd.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>可以发现，内核线程的名字外面都有有中括号，这说明 ps 无法获取它们的命令行参数，所以一般来说，名字在中括号里的都可以认为是内核线程。</p>
<p>而且，你可以看到有 4 个 <code v-pre>ksoftirqd</code> 内核线程，这是因为我这台服务器的 CPU 是 4 核心的，每个 CPU 核心都对应着一个内核线程。</p>
<hr>
<h3 id="如何定位软中断-cpu-使用率过高的问题" tabindex="-1"><a class="header-anchor" href="#如何定位软中断-cpu-使用率过高的问题" aria-hidden="true">#</a> 如何定位软中断 CPU 使用率过高的问题？</h3>
<p>要想知道当前的系统的软中断情况，我们可以使用 <code v-pre>top</code> 命令查看，下面是一台服务器上的 top 的数据：</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/软中断/top_si.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>上图中的黄色部分 <code v-pre>si</code>，就是 CPU 在软中断上的使用率，而且可以发现，每个 CPU 使用率都不高，两个 CPU 的使用率虽然只有 3% 和 4% 左右，但是都是用在软中断上了。</p>
<p>另外，也可以看到 CPU 使用率最高的进程也是软中断 <code v-pre>ksoftirqd</code>，因此可以认为此时系统的开销主要来源于软中断。</p>
<p>如果要知道是哪种软中断类型导致的，我们可以使用 <code v-pre>watch -d cat /proc/softirqs</code> 命令查看每个软中断类型的中断次数的变化速率。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/软中断/watch.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>一般对于网络 I/O 比较高的 Web 服务器，<code v-pre>NET_RX</code> 网络接收中断的变化速率相比其他中断类型快很多。</p>
<p>如果发现 <code v-pre>NET_RX</code> 网络接收中断次数的变化速率过快，接下来就可以使用 <code v-pre>sar -n DEV</code> 查看网卡的网络包接收速率情况，然后分析是哪个网卡有大量的网络包进来。</p>
<figure><img src="https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost3@main/操作系统/软中断/sar_dev.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>接着，在通过 <code v-pre>tcpdump</code> 抓包，分析这些包的来源，如果是非法的地址，可以考虑加防火墙，如果是正常流量，则要考虑硬件升级等。</p>
<p>参考资料</p>
<p><a href="https://www.bilibili.com/video/BV1EW411u7th?p=6&amp;vd_source=2f575b108b5342033a342c213d5db5e2" target="_blank" rel="noopener noreferrer">CPU寄存器和内存<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/weixin_43932040/article/details/122269076" target="_blank" rel="noopener noreferrer">主要寄存器<ExternalLinkIcon/></a></p>
<p><a href="https://www.bilibili.com/video/BV1aQ4y1v7QP/?spm_id_from=333.880.my_history.page.click&amp;vd_source=2f575b108b5342033a342c213d5db5e2" target="_blank" rel="noopener noreferrer">CPU如何做加法<ExternalLinkIcon/></a></p>
</div></template>


