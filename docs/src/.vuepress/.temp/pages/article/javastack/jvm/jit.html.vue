<template><div><p>HotSpot 虚拟机包含多个即时编译器 C1、C2 和 Graal。</p>
<p>其中，Graal 是一个实验性质的即时编译器，可以通过参数 -XX:+UnlockExperimentalVMOptions -XX:+UseJVMCICompiler 启用，并且替换 C2。</p>
<p>在 Java 7 以前，我们需要根据程序的特性选择对应的即时编译器。对于执行时间较短的，或者对启动性能有要求的程序，我们采用编译效率较快的 C1，对应参数 -client。对于执行时间较长的，或者对峰值性能有要求的程序，我们采用生成代码执行效率较快的 C2，对应参数 -server。Java 7 引入了分层编译（对应参数 -XX:+TieredCompilation）的概念，综合了 C1 的启动性能优势和 C2 的峰值性能优势。分层编译将 Java 虚拟机的执行状态分为了五个层次。为了方便阐述，我用“C1 代码”来指代由 C1 生成的机器码，“C2 代码”来指代由 C2 生成的机器码。五个层级分别是：解释执行；执行不带 profiling 的 C1 代码；执行仅带方法调用次数以及循环回边执行次数 profiling 的 C1 代码；执行带所有 profiling 的 C1 代码；执行 C2 代码。</p>
<p>通常情况下，C2 代码的执行效率要比 C1 代码的高出 30% 以上。然而，对于 C1 代码的三种状态，按执行效率从高至低则是 1 层 &gt; 2 层 &gt; 3 层。其中 1 层的性能比 2 层的稍微高一些，而 2 层的性能又比 3 层高出 30%。这是因为 profiling 越多，其额外的性能开销越大。这里解释一下，profiling 是指在程序执行过程中，收集能够反映程序执行状态的数据。这里所收集的数据我们称之为程序的 profile。你可能已经接触过许许多多的 profiler，例如 JDK 附带的 hprof。这些 profiler 大多通过注入（instrumentation）或者 JVMTI 事件来实现的。Java 虚拟机也内置了 profiling。我会在下一篇中具体介绍 Java 虚拟机的 profiling 都在做些什么。在 5 个层次的执行状态中，1 层和 4 层为终止状态。当一个方法被终止状态编译过后，如果编译后的代码并没有失效，那么 Java 虚拟机是不会再次发出该方法的编译请求的。</p>
<p><a href="https://zhengyudi.github.io/2018/03/20/graal-intro/" target="_blank" rel="noopener noreferrer">Graal 编译器<ExternalLinkIcon/></a></p>
<p><a href="chrome-extension://bocbaocobfecmglnmeaeppambideimao/pdf/viewer.html?file=http%3A%2F%2Fcr.openjdk.java.net%2F~iveresov%2Ftiered%2FTiered.pdf">介绍</a></p>
<p>不同的编译路径，图片来源于我之前一篇介绍 Graal 的博客。这里我列举了 4 个不同的编译路径（Igor 的演讲列举了更多的编译路径）。通常情况下，热点方法会被 3 层的 C1 编译，然后再被 4 层的 C2 编译。如果方法的字节码数目比较少（如 getter/setter），而且 3 层的 profiling 没有可收集的数据。那么，Java 虚拟机断定该方法对于 C1 代码和 C2 代码的执行效率相同。在这种情况下，Java 虚拟机会在 3 层编译之后，直接选择用 1 层的 C1 编译。由于这是一个终止状态，因此 Java 虚拟机不会继续用 4 层的 C2 编译。在 C1 忙碌的情况下，Java 虚拟机在解释执行过程中对程序进行 profiling，而后直接由 4 层的 C2 编译。在 C2 忙碌的情况下，方法会被 2 层的 C1 编译，然后再被 3 层的 C1 编译，以减少方法在 3 层的执行时间。Java 8 默认开启了分层编译。不管是开启还是关闭分层编译，原本用来选择即时编译器的参数 -client 和 -server 都是无效的。当关闭分层编译的情况下，Java 虚拟机将直接采用 C2。如果你希望只是用 C1，那么你可以在打开分层编译的情况下使用参数 -XX:TieredStopAtLevel=1。在这种情况下，Java 虚拟机会在解释执行之后直接由 1 层的 C1 进行编译。</p>
<p><strong>即时编译的触发</strong></p>
<p>Java 虚拟机是根据方法的调用次数以及循环回边的执行次数来触发即时编译的。前面提到，Java 虚拟机在 0 层、2 层和 3 层执行状态时进行 profiling，其中就包含方法的调用次数和循环回边的执行次数。这里的循环回边是一个控制流图中的概念。在字节码中，我们可以简单理解为往回跳转的指令。（注意，这并不一定符合循环回边的定义。）public static void foo(Object obj) {  int sum = 0;  for (int i = 0; i &lt; 200; i++) {    sum += i;  }}举例来说，上面这段代码将被编译为下面的字节码。其中，偏移量为 18 的字节码将往回跳至偏移量为 7 的字节码中。在解释执行时，每当运行一次该指令，Java 虚拟机便会将该方法的循环回边计数器加 1。public static void foo(java.lang.Object);  Code:     0: iconst_0     1: istore_1     2: iconst_0     3: istore_2     4: goto 14     7: iload_1     8: iload_2     9: iadd    10: istore_1    11: iinc 2, 1    14: iload_2    15: sipush 200    18: if_icmplt 7    21: return在即时编译过程中，我们会识别循环的头部和尾部。在上面这段字节码中，循环的头部是偏移量为 14 的字节码，尾部为偏移量为 11 的字节码。循环尾部到循环头部的控制流边就是真正意义上的循环回边。也就是说，C1 将在这个位置插入增加循环回边计数器的代码。解释执行和 C1 代码中增加循环回边计数器的位置并不相同，但这并不会对程序造成影响。</p>
<p>实际上，Java 虚拟机并不会对这些计数器进行同步操作，因此收集而来的执行次数也并非精确值。不管如何，即时编译的触发并不需要非常精确的数值。只要该数值足够大，就能说明对应的方法包含热点代码。具体来说，在不启用分层编译的情况下，当方法的调用次数和循环回边的次数的和，超过由参数 -XX:CompileThreshold 指定的阈值时（使用 C1 时，该值为 1500；使用 C2 时，该值为 10000），便会触发即时编译。当启用分层编译时，Java 虚拟机将不再采用由参数 -XX:CompileThreshold 指定的阈值（该参数失效），而是使用另一套阈值系统。在这套系统中，阈值的大小是动态调整的。所谓的动态调整其实并不复杂：在比较阈值时，Java 虚拟机会将阈值与某个系数 s 相乘。该系数与当前待编译的方法数目成正相关，与编译线程的数目成负相关。</p>
<p>在 64 位 Java 虚拟机中，默认情况下编译线程的总数目是根据处理器数量来调整的（对应参数 -XX:+CICompilerCountPerCPU，默认为 true；当通过参数 -XX:+CICompilerCount=N 强制设定总编译线程数目时，CICompilerCountPerCPU 将被设置为 false）。Java 虚拟机会将这些编译线程按照 1:2 的比例分配给 C1 和 C2（至少各为 1 个）。举个例子，对于一个四核机器来说，总的编译线程数目为 3，其中包含一个 C1 编译线程和两个 C2 编译线程。</p>
<p>OSR 编译可以看到，决定一个方法是否为热点代码的因素有两个：方法的调用次数、循环回边的执行次数。即时编译便是根据这两个计数器的和来触发的。为什么 Java 虚拟机需要维护两个不同的计数器呢？实际上，除了以方法为单位的即时编译之外，Java 虚拟机还存在着另一种以循环为单位的即时编译，叫做 On-Stack-Replacement（OSR）编译。循环回边计数器便是用来触发这种类型的编译的。OSR 实际上是一种技术，它指的是在程序执行过程中，动态地替换掉 Java 方法栈桢，从而使得程序能够在非方法入口处进行解释执行和编译后的代码之间的切换。事实上，去优化（deoptimization）采用的技术也可以称之为 OSR。在不启用分层编译的情况下，触发 OSR 编译的阈值是由参数 -XX:CompileThreshold 指定的阈值的倍数。该倍数的计算方法为：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token punctuation">(</span><span class="token class-name">OnStackReplacePercentage</span> <span class="token operator">-</span> <span class="token class-name">InterpreterProfilePercentage</span><span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">100</span>

其中<span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token class-name">InterpreterProfilePercentage</span>的默认值为<span class="token number">33</span>，当使用<span class="token constant">C1</span>时<span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token class-name">OnStackReplacePercentage</span>为<span class="token number">933</span>，当使用<span class="token constant">C2</span>时为<span class="token number">140</span>。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 Java 8 开始，Java 虚拟机默认采用分层编译的方式。它将执行分为五个层次，分为为 0 层解释执行，1 层执行没有 profiling 的 C1 代码，2 层执行部分 profiling 的 C1 代码，3 层执行全部 profiling 的 C1 代码，和 4 层执行 C2 代码。通常情况下，方法会首先被解释执行，然后被 3 层的 C1 编译，最后被 4 层的 C2 编译。即时编译是由方法调用计数器和循环回边计数器触发的。在使用分层编译的情况下，触发编译的阈值是根据当前待编译的方法数目动态调整的。OSR 是一种能够在非方法入口处进行解释执行和编译后代码之间切换的技术。OSR 编译可以用来解决单次调用方法包含热循环的性能优化问题。</p>
<p>即时编译是由方法调用计数器和循环回边计数器触发的。在使用分层编译的情况下，触发编译的阈值是根据当前待编译的方法数目动态调整的。OSR 是一种能够在非方法入口处进行解释执行和编译后代码之间切换的技术。OSR 编译可以用来解决单次调用方法包含热循环的性能优化问题。今天的实践环节，你可以使用参数 -XX:+PrintCompilation 来打印你项目中的即时编译情况。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
     88   15       3       CompilationTest::foo (16 bytes)
     88   16       3       java.lang.Integer::valueOf (32 bytes)
     88   17       4       CompilationTest::foo (16 bytes)
     88   18       4       java.lang.Integer::valueOf (32 bytes)
     89   15       3       CompilationTest::foo (16 bytes)   made not entrant
     89   16       3       java.lang.Integer::valueOf (32 bytes)   made not entrant
     90   19 %     3       CompilationTest::main @ 5 (33 bytes)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单解释一下该参数的输出：第一列是时间，第二列是 Java 虚拟机维护的编译 ID。接下来是一系列标识，包括 %（是否 OSR 编译），s（是否 synchronized 方法），！（是否包含异常处理器），b（是否阻塞了应用线程，可了解一下参数 -Xbatch），n（是否为 native 方法）。再接下来则是编译层次，以及方法名。如果是 OSR 编译，那么方法名后面还会跟着 @以及循环所在的字节码。当发生去优化时，你将看到之前出现过的编译，不过被标记了“made not entrant&quot;。它表示该方法不能再被进入。当 Java 虚拟机检测到所有的线程都退出该编译后的“made not entrant”时，会将该方法标记为“made zombie”，此时可以回收这块代码所占据的空间了</p>
<p><strong>Profiling</strong></p>
<p>上篇提到，分层编译中的 0 层、2 层和 3 层都会进行 profiling，收集能够反映程序执行状态的数据。其中，最为基础的便是方法的调用次数以及循环回边的执行次数。它们被用于触发即时编译。此外，0 层和 3 层还会收集用于 4 层 C2 编译的数据，比如说分支跳转字节码的分支 profile（branch profile），包括跳转次数和不跳转次数，以及非私有实例方法调用指令、强制类型转换 checkcast 指令、类型测试 instanceof 指令，和引用类型的数组存储 aastore 指令的类型 profile（receiver type profile）。分支 profile 和类型 profile 的收集将给应用程序带来不少的性能开销。据统计，正是因为这部分额外的 profiling，使得 3 层 C1 代码的性能比 2 层 C1 代码的低 30%。在通常情况下，我们不会在解释执行过程中收集分支 profile 以及类型 profile。只有在方法触发 C1 编译后，Java 虚拟机认为该方法有可能被 C2 编译，方才在该方法的 C1 代码中收集这些 profile。只要在比较极端的情况下，例如等待 C1 编译的方法数目太多时，Java 虚拟机才会开始在解释执行过程中收集这些 profile。那么这些耗费巨大代价收集而来的 profile 具体有什么作用呢？答案是，C2 可以根据收集得到的数据进行猜测，假设接下来的执行同样会按照所收集的 profile 进行，从而作出比较激进的优化。</p>
<p>基于分支 profile 的优化</p>
<p>举个例子，下面这段代码中包含两个条件判断。第一个条件判断将测试所输入的 boolean 值。如果为 true，则将局部变量 v 设置为所输入的 int 值。如果为 false，则将所输入的 int 值经过一番运算之后，再存入局部变量 v 之中。第二个条件判断则测试局部变量 v 是否和所输入的 int 值相等。如果相等，则返回 0。如果不等，则将局部变量 v 经过一番运算之后，再将之返回。显然，当所输入的 boolean 值为 true 的情况下，这段代码将返回 0。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
public static int foo(boolean f, int in) {
  int v;
  if (f) {
    v = in;
  } else {
    v = (int) Math.sin(in);
  }

  if (v == in) {
    return 0;
  } else {
    return (int) Math.cos(v);
  }
}
// 编译而成的字节码：
public static int foo(boolean, int);
  Code:
     0: iload_0
     1: ifeq          9
     4: iload_1
     5: istore_2
     6: goto          16
     9: iload_1
    10: i2d
    11: invokestatic  java/lang/Math.sin:(D)D
    14: d2i
    15: istore_2
    16: iload_2
    17: iload_1
    18: if_icmpne     23
    21: iconst_0
    22: ireturn
    23: iload_2
    24: i2d
    25: invokestatic java/lang/Math.cos:(D)D
    28: d2i
    29: ireturn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>C2 可以根据这两个分支 profile 作出假设，在接下来的执行过程中，这两个条件跳转指令仍旧不会发生跳转。基于这个假设，C2 便不再编译这两个条件跳转语句所对应的 false 分支了。我们暂且不管当假设错误的时候会发生什么，先来看一看剩下来的代码。经过“剪枝”之后，在第二个条件跳转处，v 的值只有可能为所输入的 int 值。因此，该条件跳转可以进一步被优化掉。最终的结果是，在第一个条件跳转之后，C2 代码将直接返回 0。</p>
<p>总结一下，根据条件跳转指令的分支 profile，即时编译器可以将从未执行过的分支剪掉，以避免编译这些很有可能不会用到的代码，从而节省编译时间以及部署代码所要消耗的内存空间。此外，“剪枝”将精简程序的数据流，从而触发更多的优化。在现实中，分支 profile 出现仅跳转或者仅不跳转的情况并不多见。当然，即时编译器对分支 profile 的利用也不仅限于“剪枝”。它还会根据分支 profile，计算每一条程序执行路径的概率，以便某些编译器优化优先处理概率较高的路径。</p>
<p>基于类型 profile 的优化另外一个例子则是关于 instanceof 以及方法调用的类型 profile。下面这段代码将测试所传入的对象是否为 Exception 的实例，如果是，则返回它的系统哈希值；如果不是，则返回它的哈希值。</p>
<p>假设应用程序调用该方法时，所传入的 Object 皆为 Integer 实例。那么，偏移量为 1 的 instanceof 指令的类型 profile 仅包含 Integer，偏移量为 4 的分支跳转语句的分支 profile 中不跳转的次数为 0，偏移量为 13 的方法调用指令的类型 profile 仅包含 Integer。</p>
<p>在 Java 虚拟机中，instanceof 测试并不简单。如果 instanceof 的目标类型是 final 类型，那么 Java 虚拟机仅需比较测试对象的动态类型是否为该 final 类型。在讲解对象的内存分布那一篇中，我曾经提到过，对象头存有该对象的动态类型。因此，获取对象的动态类型仅为单一的内存读指令。如果目标类型不是 final 类型，比如说我们例子中的 Exception，那么 Java 虚拟机需要从测试对象的动态类型开始，依次测试该类，该类的父类、祖先类，该类所直接实现或者间接实现的接口是否与目标类型一致。不过，在我们的例子中，instanceof 指令的类型 profile 仅包含 Integer。根据这个信息，即时编译器可以假设，在接下来的执行过程中，所输入的 Object 对象仍为 Integer 实例。因此，生成的代码将测试所输入的对象的动态类型是否为 Integer。如果是的话，则继续执行接下来的代码。（该优化源自 Graal，采用 C2 可能无法复现。）然后，即时编译器会采用和第一个例子中一致的针对分支 profile 的优化，以及对方法调用的条件去虚化内联。我会在接下来的篇章中详细介绍内联，这里先说结果：生成的代码将测试所输入的对象动态类型是否为 Integer。如果是的话，则执行 Integer.hashCode() 方法的实质内容，也就是返回该 Integer 实例的 value 字段。</p>
<p><strong>去优化</strong></p>
<p>Java 虚拟机给出的解决方案便是去优化，即从执行即时编译生成的机器码切换回解释执行。在生成的机器码中，即时编译器将在假设失败的位置上插入一个陷阱（trap）。该陷阱实际上是一条 call 指令，调用至 Java 虚拟机里专门负责去优化的方法。与普通的 call 指令不一样的是，去优化方法将更改栈上的返回地址，并不再返回即时编译器生成的机器码中。在上面的程序控制流图中，我画了很多红色方框的问号。这些问号便代表着一个个的陷阱。一旦踏入这些陷阱，便将发生去优化，并切换至解释执行。去优化的过程相当复杂。由于即时编译器采用了许多优化方式，其生成的代码和原本的字节码的差异非常之大。在去优化的过程中，需要将当前机器码的执行状态转换至某一字节码之前的执行状态，并从该字节码开始执行。这便要求即时编译器在编译过程中记录好这两种执行状态的映射。举例来说，经过逃逸分析之后，机器码可能并没有实际分配对象，而是在各个寄存器中存储该对象的各个字段（标量替换，具体我会在之后的篇章中进行介绍）。在去优化过程中，Java 虚拟机需要还原出这个对象，以便解释执行时能够使用该对象。当根据映射关系创建好对应的解释执行栈桢后，Java 虚拟机便会采用 OSR 技术，动态替换栈上的内容，并在目标字节码处开始解释执行。此外，在调用 Java 虚拟机的去优化方法时，即时编译器生成的机器码可以根据产生去优化的原因来决定是否保留这一份机器码，以及何时重新编译对应的 Java 方法。</p>
<p>如果去优化的原因与优化无关，即使重新编译也不会改变生成的机器码，那么生成的机器码可以在调用去优化方法时传入 Action_None，表示保留这一份机器码，在下一次调用该方法时重新进入这一份机器码。如果去优化的原因与静态分析的结果有关，例如类层次分析，那么生成的机器码可以在调用去优化方法时传入 Action_Recompile，表示不保留这一份机器码，但是可以不经过重新 profile，直接重新编译。如果去优化的原因与基于 profile 的激进优化有关，那么生成的机器码需要在调用去优化方法时传入 Action_Reinterpret，表示不保留这一份机器码，而且需要重新收集程序的 profile。这是因为基于 profile 的优化失败的时候，往往代表这程序的执行状态发生改变，因此需要更正已收集的 profile，以更好地反映新的程序执行状态。</p>
<ol>
<li>中间表达形式（IR）</li>
<li>在编译原理课程中，我们通常将编译器分为前端和后端。其中，前端会对所输入的程序进行词法分析、语法分析、语义分析，然后生成中间表达形式，也就是 IR（Intermediate Representation ）。后端会对 IR 进行优化，然后生成目标代码。如果不考虑解释执行的话，从 Java 源代码到最终的机器码实际上经过了两轮编译：Java 编译器将 Java 源代码编译成 Java 字节码，而即时编译器则将 Java 字节码编译成机器码。对于即时编译器来说，所输入的 Java 字节码剥离了很多高级的 Java 语法，而且其采用的基于栈的计算模型非常容易建模。因此，即时编译器并不需要重新进行词法分析、语法分析以及语义分析，而是直接将 Java 字节码作为一种 IR。不过，Java 字节码本身并不适合直接作为可供优化的 IR。这是因为现代编译器一般采用静态单赋值（Static Single Assignment，SSA）IR。这种 IR 的特点是每个变量只能被赋值一次，而且只有当变量被赋值之后才能使用。</li>
</ol>
</div></template>


