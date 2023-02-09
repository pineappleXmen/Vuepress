<template><div><p>做好了准备工作，现在该运行一个Java程序了。那么JVM是如何实现OOP程序的特点 封装、继承、多态的？ 一个方法是如何调用的？重载和重写是如何实现的？</p>
<p>这就是本章需要解决的内容。</p>
<h2 id="jvm怎样认识一个方法" tabindex="-1"><a class="header-anchor" href="#jvm怎样认识一个方法" aria-hidden="true">#</a> JVM怎样认识一个方法</h2>
<p>我们知道重载是可以有相同的方法名，但是有不同的参数列表。</p>
<p>那么JVM是怎样识别一个方法呢？</p>
<p>Java 虚拟机识别方法的关键在于类名、方法名以及方法描述符（method descriptor）方法描述符是由方法的参数类型以及返回类型所构成。</p>
<p>我们可以在反编译中查看一个方法描述符</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token class-name">V</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
       <span class="token number">0</span><span class="token operator">:</span> iconst_4
       <span class="token number">1</span><span class="token operator">:</span> newarray       <span class="token keyword">int</span>
       <span class="token number">3</span><span class="token operator">:</span> dup
       <span class="token number">4</span><span class="token operator">:</span> iconst_0
       <span class="token number">5</span><span class="token operator">:</span> iconst_1
       <span class="token number">6</span><span class="token operator">:</span> iastore
       <span class="token number">7</span><span class="token operator">:</span> dup
       <span class="token number">8</span><span class="token operator">:</span> iconst_1
       <span class="token number">9</span><span class="token operator">:</span> iconst_3
      <span class="token number">10</span><span class="token operator">:</span> iastore
      <span class="token number">11</span><span class="token operator">:</span> dup
      <span class="token number">12</span><span class="token operator">:</span> iconst_2
      <span class="token number">13</span><span class="token operator">:</span> iconst_5
      <span class="token number">14</span><span class="token operator">:</span> iastore
      <span class="token number">15</span><span class="token operator">:</span> dup
      <span class="token number">16</span><span class="token operator">:</span> iconst_3
      <span class="token number">17</span><span class="token operator">:</span> bipush        <span class="token number">7</span>
      <span class="token number">19</span><span class="token operator">:</span> iastore
      <span class="token number">20</span><span class="token operator">:</span> astore_1
      <span class="token number">21</span><span class="token operator">:</span> iconst_2
      <span class="token number">22</span><span class="token operator">:</span> istore_2
      <span class="token number">23</span><span class="token operator">:</span> <span class="token keyword">return</span>
    <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
      line <span class="token number">9</span><span class="token operator">:</span> <span class="token number">0</span>
      line <span class="token number">10</span><span class="token operator">:</span> <span class="token number">21</span>
      line <span class="token number">11</span><span class="token operator">:</span> <span class="token number">23</span>
    <span class="token class-name">LocalVariableTable</span><span class="token operator">:</span>
      <span class="token class-name">Start</span>  <span class="token class-name">Length</span>  <span class="token class-name">Slot</span>  <span class="token class-name">Name</span>   <span class="token class-name">Signature</span>
          <span class="token number">0</span>      <span class="token number">24</span>     <span class="token number">0</span>  args   <span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span>
         <span class="token number">21</span>       <span class="token number">3</span>     <span class="token number">1</span>     a   <span class="token punctuation">[</span><span class="token class-name">I</span>
         <span class="token number">23</span>       <span class="token number">1</span>     <span class="token number">2</span>     b   <span class="token class-name">I</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到描述符为<code v-pre>descriptor: ([Ljava/lang/String;)V</code></p>
<h2 id="动态绑定和静态绑定" tabindex="-1"><a class="header-anchor" href="#动态绑定和静态绑定" aria-hidden="true">#</a> 动态绑定和静态绑定</h2>
<p>在同一个类中，如果同时出现多个名字相同且描述符也相同的方法，那么 Java 虚拟机会在类的验证阶段报错。</p>
<p>可以看到，Java 虚拟机与 Java 语言不同，它并不限制名字与参数类型相同，但返回类型不同的方法出现在同一个类中，对于调用这些方法的字节码来说，由于字节码所附带的方法描述符包含了返回类型，因此 Java 虚拟机能够准确地识别目标方法。</p>
<p>Java 虚拟机中关于方法重写的判定同样基于方法描述符。</p>
<p>也就是说，如果子类定义了与父类中非私有、非静态方法同名的方法，<strong>那么只有当这两个方法的参数类型以及返回类型一致，Java 虚拟机才会判定为重写</strong>。</p>
<p>对于 Java 语言中重写而 Java 虚拟机中非重写的情况，编译器会通过生成桥接方法[2]来实现 Java 中的重写语义。由于对重载方法的区分在编译阶段已经完成，我们可以认为 Java 虚拟机不存在重载这一概念。</p>
<p>重载也被称为静态绑定（static binding），或者编译时多态（compile-time polymorphism）；</p>
<p>而重写则被称为动态绑定（dynamic binding）。</p>
<p>这个说法在 Java 虚拟机语境下并非完全正确。这是因为某个类中的重载方法可能被它的子类所重写，因此 Java 编译器会将所有对非私有实例方法的调用编译为需要动态绑定的类型。确切地说，<strong>Java 虚拟机中的静态绑定指的是在解析时便能够直接识别目标方法的情况，而动态绑定则指的是需要在运行过程中根据调用者的动态类型来识别目标方法的情况。</strong></p>
<p>具体来说，Java 字节码中与调用相关的指令共有五种。</p>
<p>invokestatic：用于调用静态方法。</p>
<p>invokespecial：用于调用私有实例方法、构造器，以及使用 super 关键字调用父类的实例方法或构造器，和所实现接口的默认方法。</p>
<p>invokevirtual：用于调用非私有实例方法。</p>
<p>invokeinterface：用于调用接口方法。</p>
<p>invokedynamic：用于调用动态方法。</p>
<p>对于 invokestatic 以及 invokespecial 而言，Java 虚拟机能够直接识别具体的目标方法。而对于 invokevirtual 以及 invokeinterface 而言，在绝大部分情况下，虚拟机需要在执行过程中，根据调用者的动态类型，来确定具体的目标方法。</p>
<h2 id="虚方法" tabindex="-1"><a class="header-anchor" href="#虚方法" aria-hidden="true">#</a> 虚方法</h2>
<p>Java 里所有非私有实例方法调用都会被编译成<code v-pre>invokevirtual</code>指令，而接口方法调用都会被编译成<code v-pre> invokeinterface</code> 指令。这两种指令，均属于 Java 虚拟机中的虚方法调用。</p>
<p>在绝大多数情况下，Java 虚拟机需要根据调用者的动态类型，来确定虚方法调用的目标方法。</p>
<p>这个过程我们称之为动态绑定。</p>
<p>那么，相对于静态绑定的非虚方法调用来说，虚方法调用更加耗时。</p>
<p>在 Java 虚拟机中，静态绑定包括用于调用静态方法的 invokestatic 指令，和用于调用构造器、私有实例方法以及超类非私有实例方法的 invokespecial 指令。如果虚方法调用指向一个标记为 final 的方法，那么 Java 虚拟机也可以静态绑定该虚方法调用的目标方法。</p>
<p>Java 虚拟机中采取了一种用空间换取时间的策略来实现动态绑定。它为每个类生成一张方法表，用以快速定位目标方法。</p>
<p>方法表本质上是一个数组，每个数组元素指向一个当前类及其祖先类中非私有的实例方法。</p>
<p>这些方法可能是具体的、可执行的方法，也可能是没有相应字节码的抽象方法。方法表满足两个特质：其一，子类方法表中包含父类方法表中的所有方法；其二，子类方法在方法表中的索引值，与它所重写的父类方法的索引值相同。我们知道，方法调用指令中的符号引用会在执行之前解析成实际引用。对于静态绑定的方法调用而言，实际引用将指向具体的目标方法。对于动态绑定的方法调用而言，实际引用则是方法表的索引值（实际上并不仅是索引值）。在执行过程中，Java 虚拟机将获取调用者的实际类型，并在该实际类型的虚方法表中，根据索引值获得目标方法。这个过程便是动态绑定。</p>
<p>是否可以认为虚方法调用对性能没有太大影响呢？其实是不能的，上述优化的效果看上去十分美好，但实际上仅存在于解释执行中，或者即时编译代码的最坏情况中。这是因为即时编译还拥有另外两种性能更好的优化手段：内联缓存（inlining cache）和方法内联（method inlining）。下面我便来介绍第一种内联缓存。</p>
<p><strong>内联缓存</strong>是一种加快动态绑定的优化技术。它能够缓存虚方法调用中调用者的动态类型，以及该类型所对应的目标方法。在之后的执行过程中，如果碰到已缓存的类型，内联缓存便会直接调用该类型所对应的目标方法。如果没有碰到已缓存的类型，内联缓存则会退化至使用基于方法表的动态绑定。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>在 Java 中，方法存在重载以及重写的概念，重载指的是方法名相同而参数类型不相同的方法之间的关系，重写指的是方法名相同并且参数类型也相同的方法之间的关系。Java 虚拟机识别方法的方式略有不同，除了方法名和参数类型之外，它还会考虑返回类型。在 Java 虚拟机中，静态绑定指的是在解析时便能够直接识别目标方法的情况，而动态绑定则指的是需要在运行过程中根据调用者的动态类型来识别目标方法的情况。由于 Java 编译器已经区分了重载的方法，因此可以认为 Java 虚拟机中不存在重载。在 class 文件中，Java 编译器会用符号引用指代目标方法。在执行调用指令前，它所附带的符号引用需要被解析成实际引用。对于可以静态绑定的方法调用而言，实际引用为目标方法的指针。对于需要动态绑定的方法调用而言，实际引用为辅助动态绑定的信息。在文中我曾提到，Java 的重写与 Java 虚拟机中的重写并不一致，但是编译器会通过生成桥接方法来弥补。今天的实践环节，我们来看一下两个生成桥接方法的例子。你可以通过“javap -v”来查看 class 文件所包含的方法。</p>
</div></template>


