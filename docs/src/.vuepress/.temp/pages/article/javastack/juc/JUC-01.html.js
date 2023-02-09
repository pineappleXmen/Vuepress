export const data = JSON.parse("{\"key\":\"v-4cc909d1\",\"path\":\"/article/javastack/juc/JUC-01.html\",\"title\":\"JUC基础\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"JUC基础\",\"description\":\"Java\",\"category\":[\"Java\"],\"tag\":[\"JUC\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/javastack/juc/JUC-01.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"JUC基础\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Java\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JUC\"}]]},\"headers\":[{\"level\":2,\"title\":\"进程与线程\",\"slug\":\"进程与线程\",\"link\":\"#进程与线程\",\"children\":[]},{\"level\":2,\"title\":\"并行与并发\",\"slug\":\"并行与并发\",\"link\":\"#并行与并发\",\"children\":[]},{\"level\":2,\"title\":\"Java线程\",\"slug\":\"java线程\",\"link\":\"#java线程\",\"children\":[{\"level\":3,\"title\":\"栈与栈帧\",\"slug\":\"栈与栈帧\",\"link\":\"#栈与栈帧\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.85,\"words\":856},\"filePathRelative\":\"article/javastack/juc/JUC-01.md\",\"excerpt\":\"<h1> 基础篇</h1>\\n<h2> 进程与线程</h2>\\n<p><strong>进程</strong></p>\\n<ul>\\n<li>\\n<p>程序由指令和数据组成，但这些指令要运行，数据要读写，就必须将指令加载至CPU,数据加载至内</p>\\n<p>存。在指令运行过程中还需要用到磁盘、网络等设备。进程就是用来加载指令、管理内存、管理IO的</p>\\n</li>\\n<li>\\n<p>当一个程序被运行，从磁盘加载这个程序的代码至内存，这时就开启了一个进程。</p>\\n</li>\\n<li>\\n<p>进程就可以视为程序的一个实例。大部分程序可以同时运行多个实例进程（例如记事本、画图、浏览器</p>\\n<p>等），也有的程序只能启动一个实例进程(例如网易云音乐、360安全卫士等)</p>\\n</li>\\n</ul>\"}")

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
