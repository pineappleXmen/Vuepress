export const data = JSON.parse("{\"key\":\"v-ba438662\",\"path\":\"/article/redis/%E6%BA%90%E7%A0%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html\",\"title\":\"Redis数据结构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"Redis数据结构\",\"description\":\"Redis\",\"category\":[\"Redis\"],\"tag\":[\"Redis\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/redis/%E6%BA%90%E7%A0%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Redis数据结构\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Redis\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Redis\"}]]},\"headers\":[{\"level\":2,\"title\":\"1.数据类型篇\",\"slug\":\"_1-数据类型篇\",\"link\":\"#_1-数据类型篇\",\"children\":[{\"level\":3,\"title\":\"1.1 SDS\",\"slug\":\"_1-1-sds\",\"link\":\"#_1-1-sds\",\"children\":[]},{\"level\":3,\"title\":\"1.2 intset\",\"slug\":\"_1-2-intset\",\"link\":\"#_1-2-intset\",\"children\":[]},{\"level\":3,\"title\":\"1.3Dict\",\"slug\":\"_1-3dict\",\"link\":\"#_1-3dict\",\"children\":[]},{\"level\":3,\"title\":\"1.4 QuickList\",\"slug\":\"_1-4-quicklist\",\"link\":\"#_1-4-quicklist\",\"children\":[]},{\"level\":3,\"title\":\"1.5 SkipList\",\"slug\":\"_1-5-skiplist\",\"link\":\"#_1-5-skiplist\",\"children\":[]},{\"level\":3,\"title\":\"#跳表结构设计\",\"slug\":\"跳表结构设计\",\"link\":\"#跳表结构设计\",\"children\":[]},{\"level\":3,\"title\":\"#跳表节点查询过程\",\"slug\":\"跳表节点查询过程\",\"link\":\"#跳表节点查询过程\",\"children\":[]},{\"level\":3,\"title\":\"#跳表节点层数设置\",\"slug\":\"跳表节点层数设置\",\"link\":\"#跳表节点层数设置\",\"children\":[]},{\"level\":3,\"title\":\"#为什么用跳表而不用平衡树？\",\"slug\":\"为什么用跳表而不用平衡树\",\"link\":\"#为什么用跳表而不用平衡树\",\"children\":[]}]}],\"readingTime\":{\"minutes\":24.26,\"words\":7277},\"filePathRelative\":\"article/redis/源码数据类型.md\",\"excerpt\":\"<h1> Redis源码剖析</h1>\\n<h2> 1.数据类型篇</h2>\\n<h3> 1.1 SDS</h3>\\n<blockquote>\\n<p><strong>C语言的字符串有很多问题</strong></p>\\n<p>获取字符串长度需要O(n)</p>\\n<p>二进制不安全</p>\\n<p>不可以动态修改</p>\\n</blockquote>\\n<p>SDS就是为了解决该问题而设计的</p>\\n<p>SDS优点</p>\\n<p><strong>1）常数复杂度获取字符串长度：O(1)</strong></p>\\n<p>C字符串获取字符串长度时间复杂度为O(N),使用SDS可以确保获取字符串长度的操作不会成为Redis的性能瓶颈</p>\"}")

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
