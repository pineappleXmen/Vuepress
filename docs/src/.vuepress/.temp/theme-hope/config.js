import { defineClientConfig } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import Sidebar from "@theme-hope/modules/sidebar/components/Sidebar";
import Layout from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js";
import NotFound from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/layouts/NotFound.js";

import { useScrollPromise } from "@theme-hope/composables/index";
import { injectDarkMode, setupDarkMode } from "@theme-hope/modules/outlook/composables/index";
import { setupSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo";
import { setupBlog } from "@theme-hope/modules/blog/composables/index";
import BlogCategory from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/modules/blog/layouts/BlogCategory.js";
import BlogHome from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/modules/blog/layouts/BlogHome.js";
import BlogType from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/modules/blog/layouts/BlogType.js";
import Timeline from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/modules/blog/layouts/Timeline.js";
import "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/layout.scss";
import GlobalEncrypt from "@theme-hope/modules/encrypt/components/GlobalEncrypt";
import LocalEncrypt from "@theme-hope/modules/encrypt/components/LocalEncrypt";
import Slide from "D:/vuepress-project/docs/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.143_vuepress@2.0.0-beta.59/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js";


export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
    
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
    
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
    Slide,
    
  }
});