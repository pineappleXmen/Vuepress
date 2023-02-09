<template><div><p>虚拟机已经定义好了，现在要运行一个java程序，就需要有人把该运行的程序从硬盘或者是网络搬运到我们的虚拟机环境的内存中，把准备工作做好。这个过程就是jvm的类加载过程。类加载过程通常是依靠ClassLoader实现的。</p>
<h2 id="java的基本类型的加载" tabindex="-1"><a class="header-anchor" href="#java的基本类型的加载" aria-hidden="true">#</a> Java的基本类型的加载</h2>
<p>Java 语言的类型可以分为两大类：<strong>基本类型</strong>（primitive types）和<strong>引用类型</strong>（reference types）。</p>
<p>基本类型是由JVM预先定义好的类型，在 Java 虚拟机规范中，局部变量区等价于一个数组，并且可以用正整数来索引。除了 long、double 值需要用两个数组单元来存储之外，其他基本类型以及引用类型的值均占用一个数组单元。</p>
<p>也就是说，boolean、byte、char、short 这四种类型，在操作数栈上占用的空间和 int 是一样的，和引用类型也是一样的。因此，在 32 位的 HotSpot 中，这些类型在栈上将占用 4 个字节；而在 64 位的 HotSpot JVM 中，他们将占 8 个字节。</p>
<p>对于 boolean、char 这两个无符号类型来说，加载伴随着<strong>零扩展</strong>。</p>
<p>对于 byte、short 这两个有符号类型来说，加载伴随着<strong>符号扩展</strong>。</p>
<p><a href="https://en.wikipedia.org/wiki/Sign_extension#Zero_extension" target="_blank" rel="noopener noreferrer">如果不知道什么是符号扩展<ExternalLinkIcon/></a></p>
<p>Java有八种基本类型，如果不了解，请查看Java基础的文档。</p>
<h2 id="能不能给一个基础类型值赋值超过它的取值范围" tabindex="-1"><a class="header-anchor" href="#能不能给一个基础类型值赋值超过它的取值范围" aria-hidden="true">#</a> 能不能给一个基础类型值赋值超过它的取值范围？</h2>
<p>答案是可以的，虽然这样的程序无法通过编译检查，我们可以通过ASM tool绕过编译检查。但是这样会对后续编程造成一定的麻烦。</p>
<p><a href="https://www.cnblogs.com/yelongsan/p/9674723.html" target="_blank" rel="noopener noreferrer">ASM Tool<ExternalLinkIcon/></a></p>
<p><a href="https://wiki.openjdk.org/display/CodeTools/asmtools" target="_blank" rel="noopener noreferrer">ASM Tool WIKI<ExternalLinkIcon/></a></p>
<h2 id="java引用类型的加载" tabindex="-1"><a class="header-anchor" href="#java引用类型的加载" aria-hidden="true">#</a> Java引用类型的加载</h2>
<p>引用类型分为四种：<strong>类、接口、数组类和泛型参数</strong>。由于泛型参数会在编译过程中被擦除，因此 Java 虚拟机实际上只有前三种。在类、接口和数组类中，数组类是由 Java 虚拟机直接生成的，其他两种则有对应的字节流文件。</p>
<p>类加载器也有不同的种类</p>
<p>在 Java 9 之前，**启动类加载器（Bootstrap ClassLoader）**负责加载最为基础、最为重要的类，比如存放在 JRE 的 lib 目录下 jar 包中的类（以及由虚拟机参数 -Xbootclasspath 指定的类）。</p>
<p>除了启动类加载器之外，另外两个重要的类加载器是<strong>扩展类加载器（extension class loader）<strong>和</strong>应用类加载器（application class loader</strong>，均由 Java 核心类库提供。</p>
<p>扩展类加载器的父类加载器是启动类加载器。它负责加载相对次要、但又通用的类，比如存放在 JRE 的 lib/ext 目录下 jar 包中的类（以及由系统变量 java.ext.dirs 指定的类）。</p>
<p>应用类加载器的父类加载器则是扩展类加载器。它负责加载应用程序路径下的类。（这里的应用程序路径，便是指虚拟机参数 -cp/-classpath、系统变量 java.class.path 或环境变量 CLASSPATH 所指定的路径。）</p>
<p>默认情况下，应用程序中包含的类便是由应用类加载器加载的。</p>
<p>注意，启动类加载器是由JNI提供，底层用C语言实现</p>
<p>而扩展类加载器和应用类加载器是由jdk中的java代码实现，均为java.lang.ClassLoader 的子类。</p>
<p><a href="http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/ClassLoader.java" target="_blank" rel="noopener noreferrer">jdk8 ClassLoader源码<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/native/libjava/ClassLoader.c" target="_blank" rel="noopener noreferrer">jdk8 Bootstrap的底层实现<ExternalLinkIcon/></a></p>
<h2 id="双亲委派的底层实现" tabindex="-1"><a class="header-anchor" href="#双亲委派的底层实现" aria-hidden="true">#</a> 双亲委派的底层实现</h2>
<p>每当一个类加载器接收到加载请求时，它会先将请求转发给父类加载器。在父类加载器没有找到所请求的类的情况下，该类加载器才会尝试去加载。</p>
<p>那么这种方法在底层是如何实现的呢？</p>
<p>查看jdk8 <a href="http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/ClassLoader.java#l401" target="_blank" rel="noopener noreferrer">Classloader类源码<ExternalLinkIcon/></a></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">protected</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">boolean</span> resolve<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token function">getClassLoadingLock</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// First, check if the class has already been loaded</span>
            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> c <span class="token operator">=</span> <span class="token function">findLoadedClass</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">long</span> t0 <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">nanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        c <span class="token operator">=</span> parent<span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        c <span class="token operator">=</span> <span class="token function">findBootstrapClassOrNull</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// ClassNotFoundException thrown if class not found</span>
                    <span class="token comment">// from the non-null parent class loader</span>
                <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，开头应用了synchronized来保证并发安全。</p>
<p>通过findLoadedClass查询缓存中是否已经加载了该类，如果没有则进入类加载过程。</p>
<p>如果父类不为空，则调用父类的loadClass方法进行类加载，如果为空，则证明已经是最顶层的类加载器，则需要调用<code v-pre>findBootstrapClassOrNull</code>方法来从启动类进行加载。</p>
<p>继续跟踪，我们发现<code v-pre>findBootstrapClass</code>是一个native方法，这证明是JNI提供的接口实现的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">private</span> <span class="token keyword">native</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">findBootstrapClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>继续进入libjava代码中查找</p>
<p><a href="https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/native/libjava/ClassLoader.c#L218" target="_blank" rel="noopener noreferrer">native 源码<ExternalLinkIcon/></a></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token function">Java_java_lang_ClassLoader_findBootstrapClass</span><span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span>env<span class="token punctuation">,</span> jobject loader<span class="token punctuation">,</span>
                                              jstring classname<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>clname<span class="token punctuation">;</span>
    jclass cls <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">128</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>classname <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    clname <span class="token operator">=</span> <span class="token function">getUTF</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> classname<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>clname <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">JNU_ThrowOutOfMemoryError</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">VerifyFixClassname</span><span class="token punctuation">(</span>clname<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">VerifyClassname</span><span class="token punctuation">(</span>clname<span class="token punctuation">,</span> JNI_TRUE<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">/* expects slashed name */</span>
        <span class="token keyword">goto</span> done<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    cls <span class="token operator">=</span> <span class="token function">JVM_FindClassFromBootLoader</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> clname<span class="token punctuation">)</span><span class="token punctuation">;</span>

 done<span class="token operator">:</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>clname <span class="token operator">!=</span> buf<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">free</span><span class="token punctuation">(</span>clname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> cls<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现将Classloader已经加载的类进行了返回，这就是jvm的双亲委派策略的具体实现。</p>
<p><a href="https://github.com/frohoff/jdk8u-jdk/blob/master/src/share/classes/sun/misc/Launcher.java#L71" target="_blank" rel="noopener noreferrer">Launch 加载过程<ExternalLinkIcon/></a></p>
<h2 id="classloader加载过程" tabindex="-1"><a class="header-anchor" href="#classloader加载过程" aria-hidden="true">#</a> ClassLoader加载过程</h2>
<p><a href="https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html" target="_blank" rel="noopener noreferrer">Java8 类加载过程文档<ExternalLinkIcon/></a></p>
<div class="custom-container tip">
<p class="custom-container-title">类加载过程</p>
<p>The Java Virtual Machine <strong>dynamically loads, links and initializes classes and interfaces</strong>. Loading is the process of finding the binary representation of a class or interface type with a particular name and <em>creating</em> a class or interface from that binary representation. Linking is the process of taking a class or interface and combining it into the run-time state of the Java Virtual Machine so that it can be executed. Initialization of a class or interface consists of executing the class or interface initialization method <code v-pre>&lt;clinit&gt;</code></p>
</div>
<p><strong>链接</strong>，是指将创建成的类合并至 Java 虚拟机中，使之能够执行的过程。</p>
<p>它可分为<strong>验证、准备以及解析</strong>三个阶段。</p>
<p><strong>验证阶段</strong>的目的，在于确保被加载类能够满足 Java 虚拟机的约束条件。</p>
<p>通常而言，Java 编译器生成的类文件必然满足 Java 虚拟机的约束条件。</p>
<p><strong>准备阶段</strong>的目的，则是为被加载类的静态字段分配内存。</p>
<p>Java 代码中对静态字段的具体初始化，则会在稍后的初始化阶段中进行。除了分配内存外，部分 Java 虚拟机还会在此阶段构造其他跟类层次相关的数据结构，比如说用来实现虚方法的动态绑定的方法表。</p>
<p>在 class 文件被加载至 Java 虚拟机之前，这个类无法知道其他类及其方法、字段所对应的具体地址(还没有生成动态地址），甚至不知道自己方法、字段的地址。因此，每当需要引用这些成员时，Java 编译器会生成一个符号引用。在运行阶段，这个符号引用一般都能够无歧义地定位到具体目标上。举例来说，对于一个方法调用，编译器会生成一个包含目标方法所在类的名字、目标方法的名字、接收参数类型以及返回值类型的符号引用，来指代所要调用的方法。</p>
<p><strong>解析阶段</strong>的目的，正是将这些符号引用解析成为实际引用。如果符号引用指向一个未被加载的类，或者未被加载类的字段或方法，那么解析将触发这个类的加载（但未必触发这个类的链接以及初始化。）如果将这段话放在盖房子的语境下，那么符号引用就好比“Tony 的房子”这种说法，不管它存在不存在，我们都可以用这种说法来指代 Tony 的房子。实际引用则好比实际的通讯地址，如果我们想要与 Tony 通信，则需要启动盖房子的过程。</p>
<p><strong>初始化阶段</strong></p>
<p>在 Java 代码中，如果要初始化一个静态字段，我们可以在声明时直接赋值，也可以在静态代码块中对其赋值。如果直接赋值的静态字段被 final 所修饰，并且它的类型是基本类型或字符串时，那么该字段便会被 Java 编译器标记成常量值（ConstantValue），其初始化直接由 Java 虚拟机完成。除此之外的直接赋值操作，以及所有静态代码块中的代码，则会被 Java 编译器置于同一方法中，并把它命名为 &lt; clinit &gt;。</p>
<p>类加载的最后一步是初始化，便是为标记为常量值的字段赋值，以及执行 &lt; clinit &gt; 方法的过程。Java 虚拟机会通过加锁来确保类的 &lt; clinit &gt; 方法仅被执行一次。只有当初始化完成之后，类才正式成为可执行的状态。这放在我们盖房子的例子中就是，只有当房子装修过后，Tony 才能真正地住进去。那么，类的初始化何时会被触发呢？</p>
<p>JVM 规范枚举了下述多种触发情况：</p>
<blockquote>
<p>当虚拟机启动时，初始化用户指定的主类；</p>
<p>当遇到用以新建目标类实例的 new 指令时，初始化 new 指令的目标类；</p>
<p>当遇到调用静态方法的指令时，初始化该静态方法所在的类；</p>
<p>当遇到访问静态字段的指令时，初始化该静态字段所在的类；</p>
<p>子类的初始化会触发父类的初始化；</p>
<p>如果一个接口定义了 default 方法，那么直接实现或者间接实现该接口的类的初始化，会触发该接口的初始化；</p>
<p>使用反射 API 对某个类进行反射调用时，初始化这个类；</p>
<p>当初次调用 MethodHandle 实例时，初始化该 MethodHandle 指向的方法所在的类。</p>
</blockquote>
<h2 id="运行时常量池" tabindex="-1"><a class="header-anchor" href="#运行时常量池" aria-hidden="true">#</a> 运行时常量池</h2>
<p>【TBD】</p>
</div></template>


