export const data = JSON.parse("{\"key\":\"v-7c6a4908\",\"path\":\"/article/algorithm/datastruct/br-tree.html\",\"title\":\"红黑树\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"红黑树\",\"description\":\"数据结构\",\"category\":[\"算法\"],\"tag\":[\"数据结构\"],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/article/algorithm/datastruct/br-tree.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Pineapple Coding\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"红黑树\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"数据结构\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"数据结构\"}]]},\"headers\":[{\"level\":2,\"title\":\"插入数据put\",\"slug\":\"插入数据put\",\"link\":\"#插入数据put\",\"children\":[{\"level\":3,\"title\":\"1.插入节点的父节点是黑色\",\"slug\":\"_1-插入节点的父节点是黑色\",\"link\":\"#_1-插入节点的父节点是黑色\",\"children\":[]},{\"level\":3,\"title\":\"2.插入节点的父节点是红色\",\"slug\":\"_2-插入节点的父节点是红色\",\"link\":\"#_2-插入节点的父节点是红色\",\"children\":[]}]}],\"readingTime\":{\"minutes\":2.23,\"words\":668},\"filePathRelative\":\"article/algorithm/datastruct/br-tree.md\",\"excerpt\":\"<p>红黑树是特殊的二叉查找树，意味着它满足二叉查找树的特征：任意一个节点所包含的键值，大于等于左孩子的键值，小于等于右孩子的键值。</p>\\n<p>红黑树的特点</p>\\n<blockquote>\\n<p>1.每个节点或者是黑色，或者是红色。</p>\\n<p>2.根节点是黑色。</p>\\n<p>3.每个叶子节点是黑色。 注意：这里叶子节点，是指为空的叶子节点！</p>\\n<p>4.如果一个节点是红色的，则它的子节点必须是黑色的。</p>\\n<p>5.从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。</p>\\n</blockquote>\\n<h2> 插入数据put</h2>\\n<p>初始化时 将该节点默认设为红色</p>\"}")

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
