<template><div><h2 id="_1-cpu" tabindex="-1"><a class="header-anchor" href="#_1-cpu" aria-hidden="true">#</a> 1.CPU</h2>
<p><strong>CPU</strong>(Central Processing Unit) 中央处理器，是计算机系统的运算和控制核心，是信息处理、程序运行的最终执行单元。</p>
<p>CPU主要由<strong>运算逻辑单元、控制单元、寄存器、以及I/O单元</strong>组成。接下来我们尝试细致了解一下各个单元的作用。</p>
<h3 id="逻辑运算单元-arithmetic-logic-unit-alu" tabindex="-1"><a class="header-anchor" href="#逻辑运算单元-arithmetic-logic-unit-alu" aria-hidden="true">#</a> <strong>逻辑运算单元（Arithmetic Logic Unit）ALU</strong></h3>
<div class="custom-container tip">
<p class="custom-container-title">ALU</p>
<p><strong>如何在计算机中表示数据（真值）？</strong></p>
<p><strong>如何对数据进行运算？</strong></p>
</div>
<p>顾名思义，ALU主要处理运算和逻辑计算。</p>
<p>第一个封装在单个芯片内的完整ALU是英特尔74181，在1970年发布。</p>
<p>ALU实际由两部分组成，一个是<strong>算术单元</strong>，一个是<strong>逻辑单元</strong>。</p>
<p><strong>如何在计算机中表示数据（真值）？</strong></p>
<p>我们知道，计算机用二进制来存储数据。那么对于其他类型的数据该如何做转换呢？</p>
<div class="custom-container note">
<p class="custom-container-title">数据类型及表示方法</p>
<p><strong>无符号整数（unsigned integer）</strong> 直接编码为二进制数据</p>
<p><strong>有符号整数（signed integer）</strong> 原码、补码、反码的形式保存数据 计算机保存的是反码</p>
<p><strong>定点/浮点数（float）</strong>   对于小数 一般采用IEEE 754的规定保存浮点数</p>
<p><strong>非数值类型（character）</strong> 如字符等 采用ASCII编码进行转换</p>
</div>
<p>第二个问题：算术单元主要做数值的计算。那么通常的四则运算在计算机中是如何实现的呢？</p>
<h4 id="加法" tabindex="-1"><a class="header-anchor" href="#加法" aria-hidden="true">#</a> <strong>加法</strong></h4>
<figure><img src="\os\image-20221007135516669.png" alt="1位半加法器" tabindex="0" loading="lazy"><figcaption>1位半加法器</figcaption></figure>
<p>上图是一个简易的一位加法运算器 他只能进行一位数据的运算</p>
<p>在二进制中 1+1=10</p>
<p>可以通过XOR运算获取半加和（S）的0 通过与运算获取进位（C）1，这样就实现了1位的加法计算器，这种计算器称为Half Adder(HA)，也就是半加法器。</p>
<p>那么如果要计算多位数的加法应该如何做呢？</p>
<p>只需要将前一位的进位与该位上的两个数，这三个数共同相加即可 获取一个半加数 一个进位数</p>
<figure><img src="\os\image-20221007135814569.png" alt="全加法器" tabindex="0" loading="lazy"><figcaption>全加法器</figcaption></figure>
<p>这种计算三个数的和的加法器称为全加法器(Full Adder)</p>
<p>将半加法器和多个全加法器叠加在一起组成一个单元时，就可以构成多位的<strong>串行进位全加法器</strong>(RCA)</p>
<figure><img src="\os\image-20221007140207382.png" alt="串行进位加法器" tabindex="0" loading="lazy"><figcaption>串行进位加法器</figcaption></figure>
<p>如图是一个四位的加法器，可以运算4位二进制数的加法，这个加法计算器是从低位到高位一位一位的进行计算的，计算高位时需要首先拿到低位的计算结果,这样会导致计算的延迟很高。</p>
<figure><img src="\os\image-20221007140554174.png" alt="并行进位全加法器" tabindex="0" loading="lazy"><figcaption>并行进位全加法器</figcaption></figure>
<p>而并行进位全加法器就可以通过并行的方式解决RCA延迟高的问题。但是相应需要的零件就会增多。</p>
<p>在Intel 80386框架中 ADD命令是用来执行加法的<strong>汇编命令</strong></p>
<p>规定如下 <a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/ADD.htm" target="_blank" rel="noopener noreferrer">80386 ADD<ExternalLinkIcon/></a></p>
<div class="custom-container note">
<p class="custom-container-title">80386 ADD</p>
<p>Operation</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>DEST := DEST + SRC;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<p>可以看到 ADD命令就是将SRC的值 加上 DEST的值 并且最终保存到DEST中</p>
<p>而ADC命令是用来执行带进位的加法的汇编命令</p>
<p><a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/ADC.htm" target="_blank" rel="noopener noreferrer">80386 ADC<ExternalLinkIcon/></a></p>
<p>可想而知 该汇编命令在CPU具体执行时就会使用到这里提到的位于CPU中的全加法器等设施。</p>
<h4 id="减法" tabindex="-1"><a class="header-anchor" href="#减法" aria-hidden="true">#</a> <strong>减法</strong></h4>
<p>减法就是在加法的基础上加上一个负数解决的。但是如何用计算机表示带符号的整数是二进制中的一个问题。</p>
<p>带符号的整数数字的第一位为符号位，用来表示正数和负数。正数为0，负数为1。按照这个规则表示的编码即为原码。</p>
<div class="custom-container note">
<p class="custom-container-title">原码</p>
<p><code v-pre>1011</code>表示<code v-pre>-3</code></p>
<p><code v-pre>0011</code>表示<code v-pre>3</code></p>
</div>
<p>如果直接用原码相加的结果可以看出 1011+0011 = 1110（16）而不是0。这说明正负数是无法用原码直接相加得出结果的。</p>
<p>思考，如何让1011变为0?</p>
<p>有两种方法：第一种 0011-0011 结果即为0 也就是十进制中的3-3=0</p>
<p>第二种方法：由于计算器只能表示一定的位数，超过该位数的进位会溢出，被舍弃，所以可以通过把该数先变为该计算器表示的最大数，然后再加1，这样通过溢出的方式也使得该数字变为0。</p>
<p>例子：</p>
<p>0011+1100=1111</p>
<p>1111+0001=10000（由于该计算器只能保留4位，故最后的答案为0000，也就是0）</p>
<p>这样就相当于3+（-3） = 0</p>
<p>我们可以看出 一个数加上自己的反数（对每一位取反 0011 -&gt; 1100）再加一，就可以得到0。</p>
<p>也就是说 0011 + 1101 = 0000 ，这里的1101也就可以表达-3了。</p>
<p>将原码的每一位取反，得到的数字为<strong>反码</strong></p>
<p>而这里的1101就是负数的<strong>补码</strong></p>
<div class="custom-container note">
<p class="custom-container-title">补码</p>
<p>正数：<strong>补码=原码</strong> 也就是第一种方法。</p>
<p>负数：<strong>补码=反码+1</strong>，也就是第二种方法。</p>
<p>在计算机中，带符号的整数是用补码保存的。</p>
</div>
<p>对于计算机减法而言，就是通过补码来进行计算的。</p>
<p>在Intel 80386 汇编框架中 SUB命令用来执行减法</p>
<p><a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/SUB.htm" target="_blank" rel="noopener noreferrer">80386 SUB<ExternalLinkIcon/></a></p>
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
<p>在80386指令集中 主要实现了左移、右移、按位与、按位或、异或、非等逻辑运算的命令。</p>
<p><a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/AND.htm" target="_blank" rel="noopener noreferrer">80386 AND<ExternalLinkIcon/></a></p>
<p>在实际的硬件中，就是由CPU中的ALU模块来实现对该命令的执行。</p>
<h3 id="寄存器-registers" tabindex="-1"><a class="header-anchor" href="#寄存器-registers" aria-hidden="true">#</a> <strong>寄存器（Registers）</strong></h3>
<div class="custom-container tip">
<p class="custom-container-title">寄存器</p>
<p>寄存器如何存储信息？</p>
<p>有哪些寄存器？分别有什么用处？</p>
</div>
<p><strong>寄存器是如何存储信息的？</strong></p>
<p>寄存器如何保存0？</p>
<figure><img src="\os\image-20221007152859500.png" alt="image-20221007152859500" tabindex="0" loading="lazy"><figcaption>image-20221007152859500</figcaption></figure>
<p>通过或门回连来记录1。如果回连的输入（B）为1，那么无论A做什么改变，变为0或者1，输出都为1.这也就表示我们将1存入了这个电路中。</p>
<figure><img src="\os\image-20221007153101691.png" alt="image-20221007153101691" tabindex="0" loading="lazy"><figcaption>image-20221007153101691</figcaption></figure>
<p>同样，AND门可以用来记录0，无论A做什么改变，只要B为0，则输出一直为0。</p>
<p>将这两个电路进行合并</p>
<figure><img src="\os\image-20221007153210279.png" alt="image-20221007153210279" tabindex="0" loading="lazy"><figcaption>image-20221007153210279</figcaption></figure>
<p>可以获得一个AND-OR寄存器。</p>
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
<p><strong>有哪些寄存器？分别有哪些作用？</strong></p>
<p>在CPU中，有非常多具有不同功能的寄存器。</p>
<p>以Intel经典的<strong>x86</strong>架构下来举例，其中的寄存器有</p>
<p><strong>8个通用寄存器：EAX、EBX、ECX、EDX、ESI、EDI、ESP、EBP</strong></p>
<p><strong>1个标志寄存器：EFLAGS</strong></p>
<p><strong>6个段寄存器：CS、DS、ES、FS、GS、SS</strong></p>
<p><strong>5个控制寄存器：CR0、CR1、CR2、CR3、CR4</strong></p>
<p><strong>8个调试寄存器：DR0、DR1、DR2、DR3、DR4、DR5、DR6、DR7</strong></p>
<p><strong>4个系统地址寄存器：GDTR、IDTR、LDTR、TR</strong></p>
<h4 id="通用寄存器" tabindex="-1"><a class="header-anchor" href="#通用寄存器" aria-hidden="true">#</a> <strong>通用寄存器</strong></h4>
<p><strong>EAX</strong>:累加器(Accumulator), 它的低16位即是AX，而AX又可分为高8位AH和低8位AL。累加寄存器暂时存放ALU运算的结果信息。显然，运算器中至少要有一个<strong>累加寄存器</strong>。在运算器中，累加器是专门存放算术或逻辑运算的一个操作数和运算结果的寄存器。能进行<strong>加、减、读出、移位、循环移位和求补等操作</strong>。是运算器的主要部分。</p>
<p><strong>EBX</strong>：基地址寄存器(Base Register), 它的低16位即是BX，而BX又可分为高8位BH和低8位BL。主要用于在<strong>内存寻址时存放基地址</strong>。所谓基地址就是每个段的初始地址。一个程序由<strong>数据段</strong>，<strong>代码段</strong>，<strong>堆栈段</strong>，<strong>附加段</strong>四个主要段组成。基地址其实就是每个段的起始地址，又称段地址，分别存储在四个寄存器里，DS（Data Segment），CS（Code Segment），SS（Stack Segment），ES（Extra Segment），按顺序来的。</p>
<p><strong>ECX</strong>：计数寄存器（Count Register），它的低16位即是CX，而CX又可分为高8位CH和低8位CL。在循环和字符串操作时，要用它来<strong>控制循环次数</strong>；在位操作 中，当移多位时，要用CL来指明移位的位数；是重复(REP)前缀指令和LOOP指令的内定计数器。</p>
<p><strong>EDX</strong>：数据寄存器（Data Register），它的低16位即是DX，而DX又可分为高8位DH和低8位DL。在进行乘、除运算时，它可作为默认的操作数参与运算，也可用于存放I/O的端口地址；且总是被用来放<strong>整数除法产生的余数</strong>。</p>
<p><strong>ESI/EDI</strong>：分别叫做源/目标索引寄存器(Source/Destination Index Register)，它们的低16位分别是SI、DI。它们主要用于存放存储单元在段内的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。在很多字符串操作指令中, DS:ESI指向源串,而ES:EDI指向目标串。此外，它们又作为通用寄存器可以进行任意的常规的操作，如加减移位或普通的内存间接寻址。</p>
<p><strong>EBP/BSP</strong>：分别是基址针寄存器（Base Pointer Register）/堆栈指针寄存器（Stack Pointer Register），低16位是BP、SP，其内存分别放着一个指针，该指针永远指向系统栈最上面一个栈帧的栈顶/底部。主要用于存放堆栈内存储单元的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。指针寄存器不可分割成8位寄存器。作为通用寄存器，也可存储算术逻辑运算的操作数和运算结果。并且规定：BP为基指针(Base Pointer)寄存器，用它可直接存取堆栈中的数据；SP为堆栈指针(Stack Pointer)寄存器，用它只可访问栈顶。在32位平台上，ESP每次减少4字节。EBP最经常被用作高级语言函数调用的&quot;框架指针&quot;（frame pointer）,EBP 构成了函数的一个框架，在C++反汇编中EBP通常是局部变量、传进来的参数。这里要注意在intel系统中栈是向下生长的(栈越扩大其值越小,堆恰好相反)。在通常情况下ESP是可变的,随着栈的生长而逐渐变小,而ESB寄存器是固定的,只有当函数的调用后,发生入栈操作而改变，在函数执行结束之后需要还原。</p>
<h4 id="状态寄存器" tabindex="-1"><a class="header-anchor" href="#状态寄存器" aria-hidden="true">#</a> 状态寄存器</h4>
<p><strong>EFLAGS</strong>：主要用于提供程序的状态及进行相应的控制。32位的EFLAGS寄存器包含一组状态标志、系统标志以及一个控制标志。在x86处理器初始化之后，EFLAGS寄存器的状态值为0000 0002H。第1、3、5、15以及22到31位均被保留，这个寄存器中的有些标志通过使用特殊的通用指令可以直接被修改，但并没有指令能够检查或者修改整个寄存器。通过使用LAHF/SAHF/PUSHF/POPF/POPFD等指令，可以将EFLAGS寄存器的标志位成组移到程序栈或EAX寄存器，或者从这些设施中将操作后的结果保存到EFLAGS寄存器中。在EFLAGS寄存器的内容被传送到栈或是EAX寄存器后，可以通过位操作指令(BT,BTS, BTR, BTC)检查或修改这些标志位。当调用中断或异常处理程序时，处理器将在程序栈上自动保存EFLAGS的状态值。若在中断或异常处理时发生任务切换，那么EFLAGS寄存器的状态将被保存在TSS中，注意是将要被挂起的本次任务的状态。</p>
<h4 id="段寄存器" tabindex="-1"><a class="header-anchor" href="#段寄存器" aria-hidden="true">#</a> 段寄存器</h4>
<p><strong>CS</strong>：CS段寄存器包含代码段的段选择符，代码段保存正在执行的指令。处理器从代码段读取指令时，使用有CS寄存器中的段选择符与EIP寄存器联合构成的逻辑地址。EIP保存要执行的下一条指令在代码段中的偏移量。CS寄存器不能有应用程序显式地的加载。相反，可以通过某些指令或处理器内部操作隐式地加载。这些指令/内部操作，例如过程调用，中断处理，或者任务切换，用于改变程序的执行流，从而导致更新CS寄存器。</p>
<p><strong>DS/ES/FS/GS</strong>：这四个寄存器指向四个数据段。多个数据段的存在允许高效地且安全地访问不同的数据结构类型。例如，可以创建如下的四个数据段：第一个数据段保存当前程序模块的数据结构，第二个数据段保存更高级别程序模块导出的数据，第三个数据段保存动态创建的数据结构，最后一个数据段保存另一个程序共享出来的数据。要想访问更多的数据段，应用程序必须按需将数据段对应的段选择符加载到DS/ES/FS/GS寄存器中的其中一个当中。</p>
<p><strong>SS</strong>：SS寄存器包含栈段的段选择符，这里栈段用于存储程序/任务/当前正在执行的处理器程序的栈帧。所有的栈操作都使用SS栈段寄存器来定位栈段。与CS代码段寄存器不同，SS寄存器可以显式地加载，这样就允许应用程序建立多个栈段，并在这些段间切换。</p>
<h4 id="控制寄存器" tabindex="-1"><a class="header-anchor" href="#控制寄存器" aria-hidden="true">#</a> <strong>控制寄存器</strong></h4>
<p>X86提供了控制寄存器，来决定CPU的操作模式和当前执行的任务的属性。有4个控制寄存器：CR0、CR1、CR2、CR3；均为32位，用于控制和确定处理器的操作模式以及当前执行任务的特性，保存全局性和任务无关的机器状态。这几个寄存器是与分页机制密切相关的，因此，在进程管理及虚拟内存管理中会涉及到这几个寄存器。对控制寄存器的读写是通过mov指令来实现。</p>
<h4 id="调试寄存器" tabindex="-1"><a class="header-anchor" href="#调试寄存器" aria-hidden="true">#</a> <strong>调试寄存器</strong></h4>
<p>调试寄存器主要作用是调试应用代码、系统代码、开发多任务操作系统.来监视代码的运行和处理器的性能。</p>
<h4 id="系统地址寄存器" tabindex="-1"><a class="header-anchor" href="#系统地址寄存器" aria-hidden="true">#</a> <strong>系统地址寄存器</strong></h4>
<p>全局描述符表GDT、局部描述符表LDT和中断描述符表IDT等都是保护方式下非常重要的特殊段，它们包含有为段机制所用的重要表格。为了方便快速地定位这些段，处理器采用一些特殊的寄存器保存这些段的基地址和段界限。我们把这些特殊的寄存器称为系统地址寄存器。</p>
<h4 id="其他寄存器" tabindex="-1"><a class="header-anchor" href="#其他寄存器" aria-hidden="true">#</a> 其他寄存器</h4>
<p><strong>EIP</strong>：主要用于存放当前代码段即将被执行的下一条指令的偏移，但其本质上并不能直接被指令直接访问。这个寄存器指令由控制转移指令、中断及异常所控制。读操作通过执行call指令并取得栈中所存放的地址来实现，而写操作则通过修改程序栈中的返回指令指针并执行RET/IRET指令来完成，因此尽管这个寄存器相当重要，但其实并不是操作系统在实现过程中所需关注的焦点。</p>
<p><strong>TSC</strong>：（时间戳寄存器）每个时钟周期时其值加1，重启时清零。通过RDTSC指令读取TSC寄存器，只有当CR4寄存器的TSD位为0时，才可以在任何优先级下执行该指令，否则只能在特权级下执行该指令。</p>
<p>**浮点寄存器：**由于在80486微处理器内部设有浮点运算器，因此在其内部有相应的寄存器，其中包括8个80位通用数据寄存器、1个48位指令指针寄存器、1个48位数据指针寄存器、1个16位控制字寄存器、1个16位状态字寄存器和1个16位标记字寄存器。</p>
<p>不同的寄存器实现不同的作用，如果目前对这些寄存器的作用不太了解没有关系，在NEMU中，通过CPU_STATE结构体来模拟寄存器。届时就可以更为详细的了解各个寄存器的作用了。</p>
<h3 id="控制单元" tabindex="-1"><a class="header-anchor" href="#控制单元" aria-hidden="true">#</a> <strong>控制单元</strong></h3>
<p>控制单元是一个统一的指挥中心，它可以获得下一条指令，解析命令，随后按照编码表的规定执行这条指令。</p>
<p>指令会指导运算单元取出数据单元中的某几个数据，计算出结果，然后放在寄存器，或是加载进内存。</p>
<h3 id="cpu运行流程" tabindex="-1"><a class="header-anchor" href="#cpu运行流程" aria-hidden="true">#</a> <strong>CPU运行流程</strong></h3>
<p>CPU运行具体的一条指令大概过程可以分为三步：</p>
<div class="custom-container note">
<p class="custom-container-title">CPU运行流程</p>
<p><strong>根据EIP寄存器存储的地址从内存取到机器码</strong></p>
<p><strong>-&gt;</strong></p>
<p><strong>根据Intel汇编指令编码集解析机器码</strong></p>
<p><strong>-&gt;</strong></p>
<p><strong>控制中心运行该机器码，随后EIP的值发生跳转或者自增(指向下一条命令的地址）</strong></p>
</div>
<p>在一个时钟周期里，CPU重复做这几个流程。</p>
<figure><img src="\os\image-20221007173205931.png" alt="image-20221007173205931" tabindex="0" loading="lazy"><figcaption>image-20221007173205931</figcaption></figure>
<p>CS:IP 确定一个指令在内存的具体位置，通过控制单元从RAM中拿到数据指令，存入指令寄存器，控制单元对指令寄存器的指令进行解析，随后执行该指令。</p>
<figure><img src="\os\image-20221007190537292.png" alt="image-20221007190537292" tabindex="0" loading="lazy"><figcaption>image-20221007190537292</figcaption></figure>
<ul>
<li>第一步，CPU 读取「<strong>程序计数器EIP</strong>」的值，这个值是指令的内存地址，然后 CPU 的「<strong>控制单元</strong>」操作「<strong>地址总线</strong>」指定需要访问的内存地址，接着通知内存设备准备数据，数据准备好后通过「<strong>数据总线</strong>」将指令数据传给 CPU，CPU 收到内存传来的数据后，将这个指令数据存入到「<strong>指令寄存器</strong>」。</li>
<li>第二步，CPU 分析「<strong>指令寄存器</strong>」中的指令，确定指令的类型和参数，如果是计算类型的指令，就把指令交给「<strong>逻辑运算单元</strong>」运算；如果是存储类型的指令，则交由「<strong>控制单元</strong>」执行；</li>
<li>第三步，CPU 执行完指令后，「<strong>程序计数器</strong>」的值自增，表示指向下一条指令。这个自增的大小，由 CPU 的位宽决定，比如 32 位的 CPU，指令是 4 个字节，需要 4 个内存地址存放，因此「<strong>程序计数器</strong>」的值会自增 4；</li>
</ul>
<h4 id="cpu如何寻址" tabindex="-1"><a class="header-anchor" href="#cpu如何寻址" aria-hidden="true">#</a> CPU如何寻址</h4>
<p>在汇编指令集中 一般有几种数据类型</p>
<div class="custom-container note">
<p class="custom-container-title">汇编指令格式</p>
<h4 id="at-t-格式" tabindex="-1"><a class="header-anchor" href="#at-t-格式" aria-hidden="true">#</a> AT&amp;T 格式</h4>
<p><strong>指令长度后缀 源操作数 目的操作数</strong></p>
<p>MOVl $07 %eax</p>
<h4 id="intel格式" tabindex="-1"><a class="header-anchor" href="#intel格式" aria-hidden="true">#</a> INTEL格式</h4>
<p><strong>指令 目的操作数 源操作数</strong></p>
<p>MOV EAX,0x7</p>
<p>以上两种格式均表示把07这个立即数 mov到eax寄存器中</p>
</div>
<div class="custom-container note">
<p class="custom-container-title">汇编数据类型</p>
<p>立即数：表示一个数字 一般用  $1000表示</p>
<p>寄存器： 一般用%eax 表示寄存器的地址</p>
</div>
<h3 id="寻址方式" tabindex="-1"><a class="header-anchor" href="#寻址方式" aria-hidden="true">#</a> 寻址方式</h3>
<p><strong>寄存器方式</strong>：操作数是处理器寄存器中的内容，直接给出寄存器名称即可。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Move $200 EAX //表示把200数值存入寄存器EAX中
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
<p>是由芯片开发商指定的指令集，一个数字对应一个命令。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>如
Move A,B //将A的值写入B
Add A,B //将A的值加B 写入B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较经典的指令集如 INTEL 80386指令集</p>
<p><a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/appa.htm" target="_blank" rel="noopener noreferrer">INTEL 80386<ExternalLinkIcon/></a></p>
<p>在指令集中规定了各个指令的具体用法。</p>
<p>我们将在NEMU PA2中实现80386中的指令集功能</p>
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
<p>参考资料</p>
<p><a href="https://www.bilibili.com/video/BV1EW411u7th?p=6&amp;vd_source=2f575b108b5342033a342c213d5db5e2" target="_blank" rel="noopener noreferrer">CPU寄存器和内存<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/weixin_43932040/article/details/122269076" target="_blank" rel="noopener noreferrer">主要寄存器<ExternalLinkIcon/></a></p>
<p><a href="https://www.bilibili.com/video/BV1aQ4y1v7QP/?spm_id_from=333.880.my_history.page.click&amp;vd_source=2f575b108b5342033a342c213d5db5e2" target="_blank" rel="noopener noreferrer">CPU如何做加法<ExternalLinkIcon/></a></p>
<p><a href="https://pdos.csail.mit.edu/6.828/2005/readings/i386/toc.htm" target="_blank" rel="noopener noreferrer">80386 Intel指令手册<ExternalLinkIcon/></a></p>
</div></template>


