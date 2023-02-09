import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: './dist',
  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Docs Demo",
    //   description: "A docs demo for vuepress-theme-hope",
    // },
    "/":{
      lang: "zh-CN",
      title: "Pineapple Coding",
      description: "这是菠萝的知识博客",
    },
  },

  theme,

  shouldPrefetch: false,
});
