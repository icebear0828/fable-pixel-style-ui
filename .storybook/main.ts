import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (cfg) => {
    // 复用项目 vite.config.ts，但移除单文件打包插件（与 Storybook 的多入口构建不兼容）
    cfg.plugins = (cfg.plugins ?? []).flat().filter((p) => !(p && typeof p === "object" && "name" in p && String((p as { name?: string }).name).includes("singlefile")));
    return cfg;
  },
};

export default config;
