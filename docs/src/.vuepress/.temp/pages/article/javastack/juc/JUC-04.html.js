export const data = JSON.parse("{\"key\":\"v-51e793ae\",\"path\":\"/article/javastack/juc/JUC-04.html\",\"title\":\"AQS\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"AQS\",\"description\":\"Java\",\"category\":[\"Java\"],\"tag\":[\"JUC\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/javastack/juc/JUC-04.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"AQS\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Java\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JUC\"}]]},\"headers\":[{\"level\":2,\"title\":\"AQS结构\",\"slug\":\"aqs结构\",\"link\":\"#aqs结构\",\"children\":[]},{\"level\":2,\"title\":\"Node数据结构\",\"slug\":\"node数据结构\",\"link\":\"#node数据结构\",\"children\":[]},{\"level\":2,\"title\":\"Usage\",\"slug\":\"usage\",\"link\":\"#usage\",\"children\":[]},{\"level\":2,\"title\":\"核心Acquire源码\",\"slug\":\"核心acquire源码\",\"link\":\"#核心acquire源码\",\"children\":[]}],\"readingTime\":{\"minutes\":2.67,\"words\":802},\"filePathRelative\":\"article/javastack/juc/JUC-04.md\",\"excerpt\":\"<h1> AbstractQueuedSynchronizer</h1>\\n<p>全称是 AbstractQueuedSynchronizer，是阻塞式锁和相关的同步器工具的框架</p>\\n<ul>\\n<li>\\n<p>用 state 属性来表示资源的状态（分独占模式和共享模式），子类需要定义如何维护这个状态，控制如何获取</p>\\n<p>锁和释放锁</p>\\n<ul>\\n<li>getState - 获取 state 状态</li>\\n<li>setState - 设置 state 状态</li>\\n<li>compareAndSetState - cas 机制设置 state 状态</li>\\n<li>独占模式是只有一个线程能够访问资源，而共享模式可以允许多个线程访问资源</li>\\n</ul>\\n</li>\\n<li>\\n<p>提供了基于 FIFO 的等待队列，类似于 Monitor 的 EntryList</p>\\n</li>\\n<li>\\n<p>条件变量来实现等待、唤醒机制，支持多个条件变量，类似于 Monitor 的 WaitSet</p>\\n</li>\\n</ul>\"}")

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
