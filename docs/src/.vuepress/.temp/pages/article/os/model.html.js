export const data = JSON.parse("{\"key\":\"v-7b8181a9\",\"path\":\"/article/os/model.html\",\"title\":\"操作系统的状态机模型和应用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"操作系统的状态机模型和应用\",\"description\":\"操作系统基础概念\",\"category\":[\"Linux\"],\"tag\":[\"OS\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/os/model.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"操作系统的状态机模型和应用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"操作系统基础概念\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"OS\"}]]},\"headers\":[{\"level\":2,\"title\":\"Bare-metal 与程序员的约定\",\"slug\":\"bare-metal-与程序员的约定\",\"link\":\"#bare-metal-与程序员的约定\",\"children\":[]},{\"level\":2,\"title\":\"x86 Family: CPU Reset 行为\",\"slug\":\"x86-family-cpu-reset-行为\",\"link\":\"#x86-family-cpu-reset-行为\",\"children\":[]}],\"readingTime\":{\"minutes\":1.08,\"words\":325},\"filePathRelative\":\"article/os/model.md\",\"excerpt\":\"<p>操作系统的最初的命令中，内存里空无一物，初始的指令是如何加载的呢？</p>\\n<h2> Bare-metal 与程序员的约定</h2>\\n<p>为了让计算机能运行任何我们的程序，一定存在软件/硬件的约定</p>\\n<ul>\\n<li>CPU reset 后，处理器处于某个确定的状态\\n<ul>\\n<li>PC 指针一般指向一段 memory-mapped ROM\\n<ul>\\n<li>ROM 存储了厂商提供的 firmware (固件)</li>\\n</ul>\\n</li>\\n<li>处理器的大部分特性处于关闭状态\\n<ul>\\n<li>缓存、虚拟存储、……</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li>Firmware (固件，厂商提供的代码)\\n<ul>\\n<li>将用户数据加载到内存\\n<ul>\\n<li>例如存储介质上的第二级 loader (加载器)</li>\\n<li>或者直接加载操作系统 (嵌入式系统)</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n</ul>\"}")

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
