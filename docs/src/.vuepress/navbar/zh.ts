import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "基础学习", icon: "creative", link: "/article/os/overview.md" },
  {
    text: "面试突击",
    icon: "edit",
    link: "/article/interview/",
    // prefix: "/posts/",
    // children: [
    //   {
    //     text: "文章 1-4",
    //     icon: "edit",
    //     prefix: "article/",
    //     children: [
    //       { text: "文章 1", icon: "edit", link: "article1" },
    //       { text: "文章 2", icon: "edit", link: "article2" },
    //       "article3",
    //       "article4",
    //     ],
    //   },
    //   {
    //     text: "文章 5-12",
    //     icon: "edit",
    //     children: [
    //       {
    //         text: "文章 5",
    //         icon: "edit",
    //         link: "article/article5",
    //       },
    //       {
    //         text: "文章 6",
    //         icon: "edit",
    //         link: "article/article6",
    //       },
    //       "article/article7",
    //       "article/article8",
    //     ],
    //   },
    //   { text: "文章 9", icon: "edit", link: "article9" },
    //   { text: "文章 10", icon: "edit", link: "article10" },
    //   "article11",
    //   "article12",
    // ],
  },
  {
    text: "算法笔记",
    icon: "note",
    // link: "https://vuepress-theme-hope.github.io/v2/zh/",
    link: "/article/algorithm/binarysearch/二分法.md"
  },
  "/aboutme",
]);
