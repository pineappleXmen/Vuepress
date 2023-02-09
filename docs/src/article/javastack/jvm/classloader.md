---
lang: zh-CN
title: 类加载
description: JVM
category: 
 - Java
tag:
 - JVM
---

虚拟机已经定义好了，现在要运行一个java程序，就需要有人把该运行的程序从硬盘或者是网络搬运到我们的虚拟机环境的内存中，把准备工作做好。这个过程就是jvm的类加载过程。类加载过程通常是依靠ClassLoader实现的。

## Java的基本类型的加载

 Java 语言的类型可以分为两大类：**基本类型**（primitive types）和**引用类型**（reference types）。

基本类型是由JVM预先定义好的类型，在 Java 虚拟机规范中，局部变量区等价于一个数组，并且可以用正整数来索引。除了 long、double 值需要用两个数组单元来存储之外，其他基本类型以及引用类型的值均占用一个数组单元。

也就是说，boolean、byte、char、short 这四种类型，在操作数栈上占用的空间和 int 是一样的，和引用类型也是一样的。因此，在 32 位的 HotSpot 中，这些类型在栈上将占用 4 个字节；而在 64 位的 HotSpot JVM 中，他们将占 8 个字节。

对于 boolean、char 这两个无符号类型来说，加载伴随着**零扩展**。

对于 byte、short 这两个有符号类型来说，加载伴随着**符号扩展**。

[如果不知道什么是符号扩展](https://en.wikipedia.org/wiki/Sign_extension#Zero_extension)

Java有八种基本类型，如果不了解，请查看Java基础的文档。

## 能不能给一个基础类型值赋值超过它的取值范围？

答案是可以的，虽然这样的程序无法通过编译检查，我们可以通过ASM tool绕过编译检查。但是这样会对后续编程造成一定的麻烦。

[ASM Tool](https://www.cnblogs.com/yelongsan/p/9674723.html)

[ASM Tool WIKI](https://wiki.openjdk.org/display/CodeTools/asmtools)

## Java引用类型的加载

引用类型分为四种：**类、接口、数组类和泛型参数**。由于泛型参数会在编译过程中被擦除，因此 Java 虚拟机实际上只有前三种。在类、接口和数组类中，数组类是由 Java 虚拟机直接生成的，其他两种则有对应的字节流文件。

类加载器也有不同的种类

在 Java 9 之前，**启动类加载器（Bootstrap ClassLoader）**负责加载最为基础、最为重要的类，比如存放在 JRE 的 lib 目录下 jar 包中的类（以及由虚拟机参数 -Xbootclasspath 指定的类）。

除了启动类加载器之外，另外两个重要的类加载器是**扩展类加载器（extension class loader）**和**应用类加载器（application class loader**，均由 Java 核心类库提供。

扩展类加载器的父类加载器是启动类加载器。它负责加载相对次要、但又通用的类，比如存放在 JRE 的 lib/ext 目录下 jar 包中的类（以及由系统变量 java.ext.dirs 指定的类）。

应用类加载器的父类加载器则是扩展类加载器。它负责加载应用程序路径下的类。（这里的应用程序路径，便是指虚拟机参数 -cp/-classpath、系统变量 java.class.path 或环境变量 CLASSPATH 所指定的路径。）

默认情况下，应用程序中包含的类便是由应用类加载器加载的。

注意，启动类加载器是由JNI提供，底层用C语言实现

而扩展类加载器和应用类加载器是由jdk中的java代码实现，均为java.lang.ClassLoader 的子类。

[jdk8 ClassLoader源码](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/ClassLoader.java)

[jdk8 Bootstrap的底层实现](https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/native/libjava/ClassLoader.c)



## 双亲委派的底层实现

每当一个类加载器接收到加载请求时，它会先将请求转发给父类加载器。在父类加载器没有找到所请求的类的情况下，该类加载器才会尝试去加载。

那么这种方法在底层是如何实现的呢？

查看jdk8 [Classloader类源码](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/ClassLoader.java#l401)

```java
 protected Class<?> loadClass(String name, boolean resolve)
        throws ClassNotFoundException
    {
        synchronized (getClassLoadingLock(name)) {
            // First, check if the class has already been loaded
            Class<?> c = findLoadedClass(name);
            if (c == null) {
                long t0 = System.nanoTime();
                try {
                    if (parent != null) {
                        c = parent.loadClass(name, false);
                    } else {
                        c = findBootstrapClassOrNull(name);
                    }
                } catch (ClassNotFoundException e) {
                    // ClassNotFoundException thrown if class not found
                    // from the non-null parent class loader
                }
```

可以看到，开头应用了synchronized来保证并发安全。

通过findLoadedClass查询缓存中是否已经加载了该类，如果没有则进入类加载过程。

如果父类不为空，则调用父类的loadClass方法进行类加载，如果为空，则证明已经是最顶层的类加载器，则需要调用`findBootstrapClassOrNull`方法来从启动类进行加载。

继续跟踪，我们发现`findBootstrapClass`是一个native方法，这证明是JNI提供的接口实现的。

```java
 private native Class<?> findBootstrapClass(String name);
```

继续进入libjava代码中查找

[native 源码](https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/native/libjava/ClassLoader.c#L218)

```c
Java_java_lang_ClassLoader_findBootstrapClass(JNIEnv *env, jobject loader,
                                              jstring classname)
{
    char *clname;
    jclass cls = 0;
    char buf[128];

    if (classname == NULL) {
        return 0;
    }

    clname = getUTF(env, classname, buf, sizeof(buf));
    if (clname == NULL) {
        JNU_ThrowOutOfMemoryError(env, NULL);
        return NULL;
    }
    VerifyFixClassname(clname);

    if (!VerifyClassname(clname, JNI_TRUE)) {  /* expects slashed name */
        goto done;
    }

    cls = JVM_FindClassFromBootLoader(env, clname);

 done:
    if (clname != buf) {
        free(clname);
    }

    return cls;
}
```

发现将Classloader已经加载的类进行了返回，这就是jvm的双亲委派策略的具体实现。

[Launch 加载过程](https://github.com/frohoff/jdk8u-jdk/blob/master/src/share/classes/sun/misc/Launcher.java#L71)

## ClassLoader加载过程

[Java8 类加载过程文档](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-5.html)

::: tip 类加载过程

The Java Virtual Machine **dynamically loads, links and initializes classes and interfaces**. Loading is the process of finding the binary representation of a class or interface type with a particular name and *creating* a class or interface from that binary representation. Linking is the process of taking a class or interface and combining it into the run-time state of the Java Virtual Machine so that it can be executed. Initialization of a class or interface consists of executing the class or interface initialization method `<clinit>`

:::

**链接**，是指将创建成的类合并至 Java 虚拟机中，使之能够执行的过程。

它可分为**验证、准备以及解析**三个阶段。

**验证阶段**的目的，在于确保被加载类能够满足 Java 虚拟机的约束条件。

通常而言，Java 编译器生成的类文件必然满足 Java 虚拟机的约束条件。

**准备阶段**的目的，则是为被加载类的静态字段分配内存。

Java 代码中对静态字段的具体初始化，则会在稍后的初始化阶段中进行。除了分配内存外，部分 Java 虚拟机还会在此阶段构造其他跟类层次相关的数据结构，比如说用来实现虚方法的动态绑定的方法表。

在 class 文件被加载至 Java 虚拟机之前，这个类无法知道其他类及其方法、字段所对应的具体地址(还没有生成动态地址），甚至不知道自己方法、字段的地址。因此，每当需要引用这些成员时，Java 编译器会生成一个符号引用。在运行阶段，这个符号引用一般都能够无歧义地定位到具体目标上。举例来说，对于一个方法调用，编译器会生成一个包含目标方法所在类的名字、目标方法的名字、接收参数类型以及返回值类型的符号引用，来指代所要调用的方法。

**解析阶段**的目的，正是将这些符号引用解析成为实际引用。如果符号引用指向一个未被加载的类，或者未被加载类的字段或方法，那么解析将触发这个类的加载（但未必触发这个类的链接以及初始化。）如果将这段话放在盖房子的语境下，那么符号引用就好比“Tony 的房子”这种说法，不管它存在不存在，我们都可以用这种说法来指代 Tony 的房子。实际引用则好比实际的通讯地址，如果我们想要与 Tony 通信，则需要启动盖房子的过程。

**初始化阶段**

在 Java 代码中，如果要初始化一个静态字段，我们可以在声明时直接赋值，也可以在静态代码块中对其赋值。如果直接赋值的静态字段被 final 所修饰，并且它的类型是基本类型或字符串时，那么该字段便会被 Java 编译器标记成常量值（ConstantValue），其初始化直接由 Java 虚拟机完成。除此之外的直接赋值操作，以及所有静态代码块中的代码，则会被 Java 编译器置于同一方法中，并把它命名为 < clinit >。

类加载的最后一步是初始化，便是为标记为常量值的字段赋值，以及执行 < clinit > 方法的过程。Java 虚拟机会通过加锁来确保类的 < clinit > 方法仅被执行一次。只有当初始化完成之后，类才正式成为可执行的状态。这放在我们盖房子的例子中就是，只有当房子装修过后，Tony 才能真正地住进去。那么，类的初始化何时会被触发呢？

JVM 规范枚举了下述多种触发情况：

> 当虚拟机启动时，初始化用户指定的主类；
>
> 当遇到用以新建目标类实例的 new 指令时，初始化 new 指令的目标类；
>
> 当遇到调用静态方法的指令时，初始化该静态方法所在的类；
>
> 当遇到访问静态字段的指令时，初始化该静态字段所在的类；
>
> 子类的初始化会触发父类的初始化；
>
> 如果一个接口定义了 default 方法，那么直接实现或者间接实现该接口的类的初始化，会触发该接口的初始化；
>
> 使用反射 API 对某个类进行反射调用时，初始化这个类；
>
> 当初次调用 MethodHandle 实例时，初始化该 MethodHandle 指向的方法所在的类。

## 运行时常量池

【TBD】
