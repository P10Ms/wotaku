import { h } from "vue";
import Theme from "vitepress/theme";
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
import "./style.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createMediumZoomProvider } from "./composables";
import Button from "./components/Button.vue";
import SidebarCard from "./components/SidebarCard.vue";
import Tooltip from "./components/Tooltip.vue";
import Authors from "./components/Authors.vue";
import Components from "@fmhy/components";
import AnnouncementPill from "./components/AnnouncementPill.vue";
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import "virtual:uno.css";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      "sidebar-nav-after": () => h(SidebarCard),
      "home-hero-prelink": () => h(AnnouncementPill),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, _siteData }) {
    app.use(VueQueryPlugin);
    enhanceAppWithTabs(app);
    app.component("Button", Button);
    app.component("Authors", Authors);
    app.component("Tooltip", Tooltip);
    createMediumZoomProvider(app, router);
    app.use(Components);
    app.use(NolebaseGitChangelogPlugin, {});
  },
};
