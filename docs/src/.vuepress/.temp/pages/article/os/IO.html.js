export const data = JSON.parse("{\"key\":\"v-b5edc88c\",\"path\":\"/article/os/IO.html\",\"title\":\"网络系统与I/O\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"网络系统与I/O\",\"description\":\"Linux操作系统\",\"category\":[\"Linux\"],\"tag\":[\"OS\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/os/IO.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"网络系统与I/O\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Linux操作系统\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"OS\"}]]},\"headers\":[{\"level\":2,\"title\":\"1.什么是DMA技术?\",\"slug\":\"_1-什么是dma技术\",\"link\":\"#_1-什么是dma技术\",\"children\":[]},{\"level\":2,\"title\":\"传统的文件传输有多糟糕？\",\"slug\":\"传统的文件传输有多糟糕\",\"link\":\"#传统的文件传输有多糟糕\",\"children\":[]},{\"level\":2,\"title\":\"如何优化文件传输的性能？\",\"slug\":\"如何优化文件传输的性能\",\"link\":\"#如何优化文件传输的性能\",\"children\":[]},{\"level\":2,\"title\":\"2.如何实现零拷贝？\",\"slug\":\"_2-如何实现零拷贝\",\"link\":\"#_2-如何实现零拷贝\",\"children\":[{\"level\":3,\"title\":\"mmap + write\",\"slug\":\"mmap-write\",\"link\":\"#mmap-write\",\"children\":[]},{\"level\":3,\"title\":\"sendfile\",\"slug\":\"sendfile\",\"link\":\"#sendfile\",\"children\":[]},{\"level\":3,\"title\":\"使用零拷贝技术的项目\",\"slug\":\"使用零拷贝技术的项目\",\"link\":\"#使用零拷贝技术的项目\",\"children\":[]}]},{\"level\":2,\"title\":\"3.PageCache 有什么作用？\",\"slug\":\"_3-pagecache-有什么作用\",\"link\":\"#_3-pagecache-有什么作用\",\"children\":[]},{\"level\":2,\"title\":\"4.大文件传输用什么方式实现？\",\"slug\":\"_4-大文件传输用什么方式实现\",\"link\":\"#_4-大文件传输用什么方式实现\",\"children\":[]},{\"level\":2,\"title\":\"5.总结\",\"slug\":\"_5-总结\",\"link\":\"#_5-总结\",\"children\":[]}],\"readingTime\":{\"minutes\":20.69,\"words\":6208},\"filePathRelative\":\"article/os/IO.md\",\"excerpt\":\"<h2> 1.什么是DMA技术?</h2>\\n<p>在没有 DMA 技术前，I/O 的过程是这样的：</p>\\n<ul>\\n<li>CPU 发出对应的指令给磁盘控制器，然后返回；</li>\\n<li>磁盘控制器收到指令后，于是就开始准备数据，会把数据放入到磁盘控制器的内部缓冲区中，然后产生一个<strong>中断</strong>；</li>\\n<li>CPU 收到中断信号后，停下手头的工作，接着把磁盘控制器的缓冲区的数据一次一个字节地读进自己的寄存器，然后再把寄存器里的数据写入到内存，而在数据传输的期间 CPU 是无法执行其他任务的。</li>\\n</ul>\\n<p>为了方便你理解，我画了一副图：</p>\"}")

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
