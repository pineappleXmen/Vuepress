export const data = JSON.parse("{\"key\":\"v-07e478ec\",\"path\":\"/article/algorithm/binarysearch/overview.html\",\"title\":\"二分法概述\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"二分法概述\",\"description\":\"二分法题目\",\"category\":[\"算法\"],\"tag\":[\"二分法\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/algorithm/binarysearch/overview.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"二分法概述\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"二分法题目\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"二分法\"}]]},\"headers\":[{\"level\":2,\"title\":\"1.查找有序集合中某个值的位置\",\"slug\":\"_1-查找有序集合中某个值的位置\",\"link\":\"#_1-查找有序集合中某个值的位置\",\"children\":[]},{\"level\":2,\"title\":\"二分法 实现代码\",\"slug\":\"二分法-实现代码\",\"link\":\"#二分法-实现代码\",\"children\":[{\"level\":3,\"title\":\"Python bisect模块\",\"slug\":\"python-bisect模块\",\"link\":\"#python-bisect模块\",\"children\":[]}]},{\"level\":2,\"title\":\"2.通过二分法猜答案\",\"slug\":\"_2-通过二分法猜答案\",\"link\":\"#_2-通过二分法猜答案\",\"children\":[]},{\"level\":2,\"title\":\"3.参考题目\",\"slug\":\"_3-参考题目\",\"link\":\"#_3-参考题目\",\"children\":[]}],\"readingTime\":{\"minutes\":7.63,\"words\":2288},\"filePathRelative\":\"article/algorithm/binarysearch/overview.md\",\"excerpt\":\"<h1> 二分法</h1>\\n<p>二分类型题目一般有两类</p>\\n<p><mark><strong>查找有序集合中某个值的位置</strong></mark>  和   <mark><strong>通过二分缩小范围猜答案</strong></mark></p>\\n<h2> <strong>1.查找有序集合中某个值的位置</strong></h2>\\n<p>一般会将整个区间分为<strong>左侧</strong>和<strong>右侧</strong>。</p>\\n<p>通过在<strong>循环中的不变量</strong>获取最终的答案。</p>\\n<p>对于一个 [1~n-1] 的区间上有序数组，根据区间开闭的定义，选定<strong>初始化</strong>的参数</p>\"}")

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
