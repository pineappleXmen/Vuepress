export const data = JSON.parse("{\"key\":\"v-fa2dc5d2\",\"path\":\"/article/javastack/jvm/classloader.html\",\"title\":\"类加载\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"类加载\",\"description\":\"JVM\",\"category\":[\"Java\"],\"tag\":[\"JVM\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/javastack/jvm/classloader.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"类加载\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"JVM\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JVM\"}]]},\"headers\":[{\"level\":2,\"title\":\"Java的基本类型的加载\",\"slug\":\"java的基本类型的加载\",\"link\":\"#java的基本类型的加载\",\"children\":[]},{\"level\":2,\"title\":\"能不能给一个基础类型值赋值超过它的取值范围？\",\"slug\":\"能不能给一个基础类型值赋值超过它的取值范围\",\"link\":\"#能不能给一个基础类型值赋值超过它的取值范围\",\"children\":[]},{\"level\":2,\"title\":\"Java引用类型的加载\",\"slug\":\"java引用类型的加载\",\"link\":\"#java引用类型的加载\",\"children\":[]},{\"level\":2,\"title\":\"双亲委派的底层实现\",\"slug\":\"双亲委派的底层实现\",\"link\":\"#双亲委派的底层实现\",\"children\":[]},{\"level\":2,\"title\":\"ClassLoader加载过程\",\"slug\":\"classloader加载过程\",\"link\":\"#classloader加载过程\",\"children\":[]},{\"level\":2,\"title\":\"运行时常量池\",\"slug\":\"运行时常量池\",\"link\":\"#运行时常量池\",\"children\":[]}],\"readingTime\":{\"minutes\":8.49,\"words\":2548},\"filePathRelative\":\"article/javastack/jvm/classloader.md\",\"excerpt\":\"<p>虚拟机已经定义好了，现在要运行一个java程序，就需要有人把该运行的程序从硬盘或者是网络搬运到我们的虚拟机环境的内存中，把准备工作做好。这个过程就是jvm的类加载过程。类加载过程通常是依靠ClassLoader实现的。</p>\\n<h2> Java的基本类型的加载</h2>\\n<p>Java 语言的类型可以分为两大类：<strong>基本类型</strong>（primitive types）和<strong>引用类型</strong>（reference types）。</p>\\n<p>基本类型是由JVM预先定义好的类型，在 Java 虚拟机规范中，局部变量区等价于一个数组，并且可以用正整数来索引。除了 long、double 值需要用两个数组单元来存储之外，其他基本类型以及引用类型的值均占用一个数组单元。</p>\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
